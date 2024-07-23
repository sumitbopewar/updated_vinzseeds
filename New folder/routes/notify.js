
var express = require("express");
var router = express.Router();

// /* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index");
// });

router.get('/', (req, res) => {
    res.render('products/notify');
});

module.exports = router;