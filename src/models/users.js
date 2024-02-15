const mongoose = require('mongoose');

// 음절 데이터 스키마 정의
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    userid: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    createAt: { type: Date, default: Date.now },
});

// 모델 생성
const User = mongoose.model('User', userSchema);

// 모듈로 내보내기
module.exports = User;