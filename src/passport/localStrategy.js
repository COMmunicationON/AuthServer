const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { connectDB, disconnectDB } = require('../controllers/dbController');
const User = require('../models/users');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: "userid",
        passwordField: "password"
    }, async (userid, password, done) => {
        try {
            await connectDB();
            // 사용자 찾기
            let user = await User.findOne({ userid: userid });

            // 사용자의 weak 정보가 없는 경우
            if (!user) {
                // 가입되지 않은 회원
                console.log('\n가입되지 않은 회원입니다.');
                return done(null, false, { error: 'Invalid userid or password' })
            }

            bcrypt.compare(password, user.password, (err, result) => {
                if (err || !result) {
                    // 비밀번호가 일치하지 않음
                    console.log('\n비밀번호가 일치하지 않습니다.');
                    return done(null, false, { error: 'Invalid userid or password' })
                }
                else {
                    // 비밀번호 일치
                    console.log('\n비밀번호 일치');
                    return done(null, user);
                }
            });


            // if (user) {
            //     // user 확인
            //     //console.log(user);

            //     bcrypt.compare(password, user.password, (err, result) => {
            //         if (err || !result) {
            //             // 비밀번호가 일치하지 않음
            //             console.log('\n비밀번호가 일치하지 않습니다.');
            //             return done(null, false, { error: 'Invalid userid or password' })
            //         }
            //         else {
            //             // 비밀번호 일치
            //             console.log('\n비밀번호 일치');
            //             return done(null, user);
            //         }
            //     });
            // } else {
            //     // 가입되지 않은 회원
            //     console.log('\n가입되지 않은 회원입니다.');
            //     return done(null, false, { error: 'Invalid userid or password' })
            // }

        } catch (err) {
            console.log('Login Error:', err);
            return done(err);
        } finally {
            await disconnectDB();
        }
    }));
};