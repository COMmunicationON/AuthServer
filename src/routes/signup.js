var express = require('express');
const User = require('../models/users');
const { signup } = require('../middlewares/signupMiddleware');

var router = express.Router();

router.post('/local', signup, async function (req, res, next) {
    // userid 와 password를 통해 로그인
});

router.post('/google', async (req, res, next) => {
    // google을 통해 로그인
});

module.exports = router;