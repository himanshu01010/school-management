const {getType, logOut, getInfo} = require("../controllers/adminController");
const express = require('express')
const protect = require("./authMiddleware");
const router = express.Router();

router.get("/auth", protect, getType)
router.get("/logout", logOut)
router.get('/getinfo',protect,getInfo);

module.exports = router;