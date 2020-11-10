const express = require('express');
const { User, Post, Image, Comment } = require('../models');
const router = express.Router();
const { Op } = require('sequelize');


// router.get('/', async (req, res, next) => {
//     try {
//         const posts = await Post.findAll({
//             limit: 10,
//             order: [['createdAt', 'DESC']],
//             include: [{
//                 model: User,
//             }, {
//                 model: Image,
//             }, {
//                 model: Comment,
//                 include: [{
//                     model: User,
//                     attributes: ['id', 'nickname'],
//                     order: [['createdAt', 'DESC']],
//                 }],
//             }],
//         });
//         res.status(200).json(posts);
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// });

router.get('/', async (req, res, next) => { // GET /posts
    try {
        const where = {};
        if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
        } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [['createdAt', 'DESC']],
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                    order: [['createdAt', 'DESC']],
                }],
                }, {
                    model: User, // 좋아요 누른 사람
                    as: 'Likers',
                    attributes: ['id'],
                }, {
                    model: Post,
                    as: 'Retweet',
                    include: [{
                        model: User,
                        attributes: ['id', 'nickname'],
                    }, {
                        model: Image,
                    }]
                }],
        });
        console.log(posts);
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;

module.exports = router;
