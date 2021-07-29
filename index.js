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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})