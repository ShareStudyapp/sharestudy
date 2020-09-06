const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv=require('dotenv');
const userRouter = require('./routes/user')
const db = require('./models')
const passportConfig = require('./passport')
const passport = require('passport')

dotenv.config();
const app = express();

passportConfig();
db.sequelize.sync()
    .then(()=>{
        console.log('db 연결 성공')
    })
    .catch(console.error)


app.use(cors({
    origin: '*',
    credential:false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cookieParser('studyshare'));
app.use(session({
    saveUninitialized:false,
    resave:false,
    secret:process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

// app.use((err,res,req,next)=>{//직접에러처리

// });

app.get('/',(req,res) => {
    res.send('test')
})
app.use('/user',userRouter)
app.listen(3065,()=>{
    console.log('서버 실행중')
});