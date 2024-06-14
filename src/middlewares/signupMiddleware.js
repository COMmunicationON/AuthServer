const User = require('../models/users');
const { connectDB, disconnectDB } = require('../controllers/dbController');
const bcrypt = require('bcrypt');

exports.signup = async (req, res, next) => {
    const { username, userid, password } = req.body;

    if (!userid || !password) {
        return res.status(400).json({ error: 'Userid and password are required' });
    }

    try {
        await connectDB();

        // 사용자 찾기
        let user = await User.findOne({ userid: userid });

        // 사용자의 weak 정보가 없는 경우
        if (user) {
            console.log(user);
            return res.status(409).json({ error: 'User with the same ID already exists' })
        }

        // 사용자 생성
        const saltRounds = 10;
        user = new User({
            username: username,
            userid: userid,
            password: hash = await bcrypt.hash(password, saltRounds)
        });

        await user.save();
        return res.status(201).json({ message: 'User created successfully' })
    } catch (err) {
        console.error('Error connecting DB ', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await disconnectDB();
    }
}