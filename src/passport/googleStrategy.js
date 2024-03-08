const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const dbController = require('../controllers/dbController');

module.exports = () => {
    passport.use(new GoogleStrategy({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_PW,
        callbackURL: '/login/google/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('google profile:', profile);
        try {
            // 구글 플랫폼에서 로그인 했고 snsID 필드에 구글 아이디가 일치할 경우

            // 이미 가입된 구글 프로필이면 성공

            // 가입되지 않은 유저면 /google 회원가입 라우터로 연결 (회원가입 시키고 로그인 진행)

        }
        catch (err) {
            console.error(err);
            done(err);
        }
    },),);
};