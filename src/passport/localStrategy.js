const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const dbController = require('../controllers/dbController');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: "userid",
        passwordField: "password"
    }, async (userid, password, done) => {
        try {
            // 인자로 전달된 userid 확인
            /*
            console.log('\n<로그인 확인>')
            console.log('userid: ', userid);
            console.log('password: ', password);
            */

            const user = await dbController.findUserByUserid(userid);

            if (user) {
                // user 확인
                //console.log(user);

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
            } else {
                // 가입되지 않은 회원
                console.log('\n가입되지 않은 회원입니다.');
                return done(null, false, { error: 'Invalid userid or password' })
            }
        } catch (err) {
            console.log('\nLogin Error:', error);
            return done(err);
        }
    }));
};