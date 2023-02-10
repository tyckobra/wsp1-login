const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const db = require('../utils/database');
const promisePool = db.promise();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.njk', 
    { 
        title: 'Login ALC'
    });
});

router.get('/login', async function(req, res, next) {
    res.render('login.njk',
    {
        title: 'Login'
    });
});

router.post('/login', async function(req, res, next) {
    const { username, password } = req.body;
    if(username == "" && password == "")
    {
        res.send('Username is Required')
    }
    else if(username == ""){
        res.send('Username is Required')
    }
    else if(password == ""){
        res.send('Password is Required')
    }
    
    bcrypt.hash(password, 10, function(err, hash) {
        
        // console.log(hash);
        // return res.json(hash);
    });
    res.send()
});

router.get('/test', async function (req, res, next) {
    res.render('test.njk',
    {
        title: 'TEST'
    });
});

router.post('/test', async function (req, res, next) {
    const { password } = req.body;
    try {
        if(password != "")
        {

        }
    } catch (error) {
        console.log(error);
    }
    bcrypt.hash(password, 10, function(err, hash) {
        
        // console.log(hash);
        // return res.json(hash);
    });
})

module.exports = router;
