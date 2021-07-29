 const mongoose = require('mongoose');
 const bcrypt = require('bcrypt');
 const saltRounds = 10; // 10자리의 salt

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

 //유저의 정보를 저장하기 function을 수행함.
 userSchema.pre('save', function (next) {
    let user = this;//위의 스키마를 가리킴;
    // 비밀번호만 변경했을때 비밀번호 암호화실행
    // 아이디 변경 등과 같은 경우에는 그대로 두기위함
    if(user.isModified('password')){
        //비밀번호 암호화
        //bcrypt를 가져와서 salt를 만들고(몇자리로 만들래? => saltRounds)
        bcrypt.genSalt(saltRounds, function(err, salt) {
            //err가 발생했다면 err를 보내 줄거야
            if(err) return next(err);
            //salt가 잘 생성됬다면
            //정상적인 password와 salt를 가져옴
            bcrypt.hash(user.password, salt, function(err, hash) {
                //hash => 암호화된 password
                //err가 발생했다면 er를 보내 줄거야
                if(err) return next(err);
                //정상적으로 암호화 됬다면
                user.password = hash;
                next()
            });
        });
    }
 })

 const User = mongoose.model('User', userSchema); //스키마를 모델로 감싸줌 (이름, 스키마)

 module.exports = { User };