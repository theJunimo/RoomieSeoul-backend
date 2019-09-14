const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
//const naver = require('./naverStrategy');
//const google = require('./googleStrategy');
const { User } = require('../models');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.email);
    });

    passport.deserializeUser((email, done) => {
        User.findOne({where : {email}})
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local(passport);
    kakao(passport);
    //naver(passport);
    //google(passport);
}
