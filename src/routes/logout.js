var express = require('express');
const { isLoggedIn } = require('../middlewares/logMiddleware');
var router = express.Router();

router.get('/', isLoggedIn, function (req, res, next) {
    //console.log(req.session);
    req.logout((err) => {
        if (err) {
            console.error('로그아웃 중 오류 발생:', err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        console.log('사용자 로그아웃 성공');
        return res.status(200).json({ message: "Logout successful" });
    });
});

module.exports = router;