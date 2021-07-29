//install express module => can start with express function 
//install mongoose module => can connect to mongDB
const express = require('express');
const app = express();
const port = 3000;

const config = require('./config/key');

const { User } = require('./models/User');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true, 
     useFindAndModify: false  
}).then(() =>  console.log('MongDB Connected...'))
  .catch(err => console.log(err ))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
  //회원가입시 필요한 정보들을 client에서 가져오면
  //가져온 정보들을 db에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => { 
    if(err) return res.json({success: false, err});
    return res.status(200).json({success: true}); 
  })

})

//로그인 기능
app.post('/login', (req, res) => {
  //요청된 이메일을 db에서 찾는다
  User.findOne({ email : req.body.email }, (err, user) => {
    //이메일이 없으면(못찾으면)
    if(!user){
      res.json({
        loginSuccess: false,
        message: '입력한 이메일에 해당하는 유저가 없습니다.'
      })
    }
    //이메일이 있다면
    //비밀번호가 일치하는지 확인
    //유저 모델에서 만든 메소드 사용(password 검사)
    user.comparePassword(req.body.password, (err, isMatch) => {
      //비밀번호가 다르면
      if(!isMatch){
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다'
         })
      }
      //비밀번호까지 일치한다면 토큰생성하기
      //유저 모델에서 만든 메소드 사용(토큰생성)
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})