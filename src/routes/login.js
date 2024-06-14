var express = require('express');
const passport = require('passport');
const { isNotLoggedIn } = require('../middlewares/logMiddleware');

var router = express.Router();

router.post('/local', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // 서버 에러
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }

        // 로직 상의 에러
        if (info || !user) {
            return res.status(401).json({ error: info.message || 'Authentication failed' });
        }

        //console.log(user);

        // 로그인 진행
        req.login(user, (loginErr) => {
            if (loginErr) {
                // return next(loginErr);
                console.error(loginErr);
                return res.status(401).json({ error: 'Login Error' });
            }

            console.log('\n<로그인할 유저 정보 확인>\n', user);
            console.log(req.session);
            return res.status(200).json({ message: "Login successful" });
        });
    })(req, res, next);
});

router.get('/google', isNotLoggedIn, passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/google/fail' }),
    (req, res) => {
        res.redirect('/');
    },
);

module.exports = router;