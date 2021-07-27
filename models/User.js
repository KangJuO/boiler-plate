 const mongoose = require('mongoose');


 const userSchema = mongoose.Schema({
     name: {
         type: String,
          maxlength: 50
     },
     email: {
         type: String,
         trim: true, // => ju o@aaa.aaa => juo@aaa.aaa 스페이스를 제거해줌
         unique: 1
     },
     password: {
         type: String,
         minlength: 5
     },
     lastname: {
         type: String,
         maxlength: 50
     },
     role: { // admin, normal 구분용
         type: Number,
         default: 0
     },
     image: String,
     token: {
         type: String
     },
     tokenExp: {
         type: Number
     }
 });

 const User = mongoose.model('User', userSchema); //스키마를 모델로 감싸줌 (이름, 스키마)

 module.exports = { User };