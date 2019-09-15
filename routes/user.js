const express = require('express');
const User = require('../models');

const router = express.Router();

router.post('/signup', async(req, res) => {

    return res.send('return합니다.');
});

router.get('/login', async(req, res) => {
    console.log(req.body);
    return res.send('return합니다.');
});

module.exports = router;