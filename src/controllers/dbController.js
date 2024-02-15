const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const User = require('../models/users');

// MongoDB 서버 URI
const uri = process.env.DB_URI;

// MongoClient 생성
let client;

// 데이터베이스 이름
const dbName = process.env.DB_NAME;

// 컬렉션 이름
const users = process.env.USER_COLLECTION;

// 데이터베이스 연결
async function connectDatabase() {
    try {
        // MongoDB 서버에 연결
        client = await MongoClient.connect(uri);

        console.log('Connected to MongoDB server');
        return client.db(dbName);
    } catch (err) {
        // 오류 처리
        console.error('Error in connectDatabase:', err);
        throw err;
        // res.status(500).json({ success: false, error: 'Internal Server Error' });

    }
}

// MongoDB 연결 해제
function closeDatabase() {
    if (client) {
        // 클라이언트가 존재하면 연결 종료
        client.close();
        console.log('MongoDB 연결이 종료되었습니다.');
    } else {
        console.warn('MongoDB에 연결되어 있지 않습니다.');
    }
}

// 데이터 삽입
async function saveUser(data) {

    try {
        // 데이터베이스 연결
        const db = await connectDatabase();
        const collection = db.collection(users);

        // 단일 문서 삽입
        const result = await collection.insertOne(data);

        // MongoDB 연결 해제
        client.close();
        console.log('MongoDB 연결 종료');
        console.log('Data inserted successfully\n');

        return result;
    } catch (err) {
        console.error('Failed to insert data:', err, '\n');
        throw err;
    }
}

async function findUserBy_id(_id) {
    try {
        // 데이터베이스 연결
        const db = await connectDatabase();
        // 사용자 확인
        const collection = db.collection(users);
        const exUser = await collection.findOne({ _id: new ObjectId(_id) });
        //const exUser = await User.findById(_id);
        // MongoDB 연결 해제
        client.close();
        console.log('MongoDB 연결 종료');
        return exUser;
    } catch (err) {
        return null;
    };
}

async function findUserByUserid(userid) {
    try {
        // 데이터베이스 연결
        const db = await connectDatabase();
        // 사용자 확인
        const collection = db.collection(users);
        const exUser = await collection.findOne({ userid });
        // MongoDB 연결 해제
        client.close();
        console.log('MongoDB 연결 종료');

        return exUser;
    } catch (err) {
        return null;
    }

}

module.exports = { connectDatabase, closeDatabase, saveUser, findUserByUserid, findUserBy_id };