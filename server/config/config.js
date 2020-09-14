const dotenv=require('dotenv');
dotenv.config();

module.exports ={
  "development": {
    "username": "csj2702",
    "password": process.env.DB_PASSWORD,
    "database": "studyshare",
    "host": "moimdev.cxz28d3n4hpj.ap-northeast-2.rds.amazonaws.com",
    "dialect": "mysql"
  },
  "test": {
    "username": "",
    "password": process.env.DB_PASSWORD,
    "database": "studyshare",
    "host": "moimdev.cxz28d3n4hpj.ap-northeast-2.rds.amazonaws.com",
    "dialect": "mysql"
  },
  "production": {
    "username": "",
    "password": process.env.DB_PASSWORD,
    "database": "studyshare",
    "host": "moimdev.cxz28d3n4hpj.ap-northeast-2.rds.amazonaws.com",
    "dialect": "mysql"
  }
}
