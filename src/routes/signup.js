var express = require('express');
const dbController = require('../controllers/dbController');
const bcrypt = require('bcrypt');
const User = require('../models/users');

var router = express.Router();

router.post('/local', async function (req, res, next) {
    const { username, userid, password } = req.body;

    if (!userid || !password) {
        return res.status(400).json({ error: 'Userid and password are required' });
    }

    try {
        const user = await dbController.findUserByUserid(userid);

        if (user) {
            console.log(user);
            return res.status(409).json({ error: 'User with the same ID already exists' })
        }

        // 사용자 생성
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            userid,
            password: hash
        })
        console.log(newUser);

        // 데이터를 MongoDB에 삽입
        await dbController.saveUser(newUser);

        return res.status(201).json({ message: 'User created successfully' })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/google', async (req, res, next) => {

});

module.exports = router;