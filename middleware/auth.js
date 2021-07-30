const { User } = require("../models/User");

//인증처리
let auth = (req, res, next) => {
    //클라이언트 쿠키에서 토큰 가져오기
    let token = req.cookies.x_auth;

    //토큰을 복호화하고 유저찾기
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        //없으면 no
        if(!user) return res.json({
            isAuth: false,
            error: true
        })
        //유저가 있으면 인증 ok
        req.token = token;
        req.user = user;
        next();
        //req에서 사용할 수 있도록 넣어주는것
    })
    
    
}

module.exports = { auth }