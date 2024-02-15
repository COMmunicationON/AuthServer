const express = require('express');
const { isLoggedIn } = require('../middlewares/logMiddleware');
const router = express.Router();

router.get('/', isLoggedIn, function (req, res, next) {
    //const userInfo = { ...req.session.user, passwordHash: undefined };
    //console.log(req.user);
    const userInfo = req.user;
    /*
    delete userInfo.password;
    delete userInfo.createAt;
    delete userInfo._id;
    */
    // 삭제할 property 목록
    const propertiesToDelete = ['password', 'createAt', '_id'];

    //목록에 있는 각 property 삭제
    propertiesToDelete.forEach(property => delete userInfo[property]);

    return res.status(200).json(userInfo);
});

module.exports = router;