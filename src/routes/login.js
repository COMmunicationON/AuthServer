var express = require('express');
const passport = require('passport');
const { isNotLoggedIn } = require('../middlewares/logMiddleware');

var router = express.Router();

router.post('/', isNotLoggedIn, function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        // 서버 에러
        if (err) {
            console.error(err);
            return next(err);
        }

        // 로직 상의 에러
        if (info) {
            return res.status(401).json({ error: info.error });
        }

        //console.log(user);

        // 로그인 진행
        return req.login(user, (loginErr) => {
            if (loginErr) return next(loginErr);

            //console.log('\n<로그인할 유저 정보 확인>\n', user);
            return res.status(200).json({ message: "Login successful" });
        });
    })(req, res, next);
});

module.exports = router;