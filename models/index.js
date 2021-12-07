const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]; //config폴더 내 config.json파일을 가져오기

const {
  username, password, database, host, dialect,
} = config;
// sequelize객체 생성하기
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

const Member = require('./member')(sequelize, Sequelize.DataTypes);

const db = {};
db.Member = Member;

module.exports = db;