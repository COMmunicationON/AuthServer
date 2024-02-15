var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  /* req 확인 */
  //console.log('<req>');
  //console.log(req.headers);

  /* res 확인 */
  //console.log('\n<res>');
  //console.log(res);

  if (req.user) {
    console.log("\n아직 사용자 정보가 req에 저장되어 있음");
    return res.json({ user_info: true });
  } else {
    console.log("\n사용자 정보가 삭제됨");
    return res.json({ user_info: false });
  }

  //res.render('index', { title: 'COMON' });
});

module.exports = router;
