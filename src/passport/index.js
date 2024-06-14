const passport = require('passport');
const localStrategy = require('./localStrategy');
const { connectDB, disconnectDB } = require('../controllers/dbController');
//const jwtStrategy = require('./jwtStrategy');
//const kakao = require('./kakaoStrategy');
const User = require('../models/users');

module.exports = () => {
    passport.serializeUser((user, done) => {
        console.log('\n<passport.serializeUser 실행>\n')
        done(null, user._id);
    });

    passport.deserializeUser(async (_id, done) => {
        console.log('\n<passport.deserializeUser 실행>');
        try {
            await connectDB();
            let user = await User.findOne({ _id: _id });

            // user를 못 찾은 경우
            if (!user) {
                return done(null, false, { error: 'No user' });
            }

            // 데이터베이스에서 찾은 user 확인
            //console.log('deserializeUser:', user, '\n');
            return done(null, user);

        } catch (err) {
            console.error('Server error at deserializeUser:', err);
            return done(err);
        } finally {
            await disconnectDB();
        }

    });

    localStrategy();
    //kakao();
    //jwtStrategy();

    return passport.initialize();
}