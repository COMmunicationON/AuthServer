exports.isLoggedIn = (req, res, next) => {
    // isLoggedIn 미들웨어 확인
    console.log('\n<isLoggedIn 미들웨어 실행 중>');
    //console.log('req.session:\n', req.session);
    if (req.isAuthenticated()) {
        console.log('로그인 되어 있음\n');
        next();
    } else {
        console.error('로그인되어 있지 않음\n');
        return res.json(404).json({ error: "Not logged in" });
    }

};

exports.isNotLoggedIn = (req, res, next) => {
    // isNotLoggedIn 미들웨어 확인
    console.log('\n<isNotLoggedIn 미들웨어 실행 중>');
    //console.log('req.session:\n', req.session);
    if (!req.isAuthenticated()) {
        // 로그인 확인
        console.log('로그인되어 있지 않음\n');
        next();
    } else {
        console.error('로그인되어 있음\n');
        return res.status(404).json({ error: "Already logged in" });
    }
};