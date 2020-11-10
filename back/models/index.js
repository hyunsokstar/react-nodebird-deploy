// 시퀄라이즈 모듈 불러 오기
const Sequelize = require('sequelize');

// env 는 아직 설정하지 않았으므로 development가 env 에 저장 된다.
const env = process.env.NODE_ENV || 'development';

// 위에서 생성한 디비 설정의 development 부분을 참조하는 config 객체 생성
const config = require('../config/config')[env];
const db = {};

// config 객체를 이용해 시퀄라이즈 객체 생성 (이 시퀄라이즈 객체를 이용해 db 작업을 할것이다.)
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 테이블 추가 
db.Comment = require('./comment')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Image = require('./image')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

