import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
// import { LOAD_USER_REQUEST } from '../reducers/user';
import { LOAD_MY_INFO_REQUEST  } from '../reducers/user';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';


const Home = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

    // useEffect(() => {
    //     dispatch({
    //         type: LOAD_USER_REQUEST,
    //     });
    //     dispatch({
    //         type: LOAD_POSTS_REQUEST,
    //     });
    // }, []);

    useEffect(() => {
        function onScroll() {
            // console.log("scroll event 발생");
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                // console.log("hasMorePosts : ", hasMorePosts);
                if (hasMorePosts && !loadPostsLoading) {
                    console.log("화면이 바닥에 도달 + 포스팅 추가!!");
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        lastId,
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [mainPosts, hasMorePosts, loadPostsLoading]);
    return (
        <AppLayout>
            {me && <PostForm />}
            {mainPosts.map((c) => {
                return (
                    <PostCard key={c.id} post={c} />
                );
            })}
        </AppLayout>
    );
};


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('getServerSideProps start');
    console.log(context.req.headers);
    // axios 에 쿠키 보내기 설정
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    // context.store.dispatch({
    //     type: LOAD_USER_REQUEST,
    // });
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_POSTS_REQUEST,
    });
    // 아래 설정을 추가해야 리덕스 사가 요청까지 완료 된뒤 페이지가 출력 된다.
    context.store.dispatch(END);
    console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
});


export default Home;