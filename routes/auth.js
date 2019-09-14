const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');


//이메일 or 닉네임 중복확인 체크
router.get('/validate?', async(req, res) => {
    const {email, nick} = req.query;
    if(email) {
        try {
            const exist = await User.findOne({where: {email}});
            if(exist) {
                return res.send({
                    emailExist: true
                });
            } else {
                return res.send({
                    emailExist: false
                });
            }
        } catch(err) {
            console.log(err);
        }
    } else if (nick) {
        console.log(nick);
        try {
            const exist = await User.findOne({where: {nick}});
            if(exist) {
                return res.send({
                    nickExist: true
                });
            } else {
                return res.send({
                    nickExist: false
                });
            }
        } catch(err) {
            console.log(err);
        }
    }
})

//회원가입
router.post('/signup', async(req, res) => {
    const { email, nick, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
        })
        return res.status(200).json({
            success: true,
        });
    } catch(err) {
        console.log(err);
    }
});

//로그인
router.post('/login', async(req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if(!user) {
            return res.send({login: false});
        }
        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.send({login: true});
        });
    })(req, res, next);
});

//카카오 로그인
router.get('/kakao', passport.authenticate('kakao'));

//카카오 로그인 콜백
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/');
});

//로그아웃
router.get('/logout', async(req, res) => {
    req.logout();
    req.session.destroy();
    return res.redirect('/');
});

module.exports = router;


