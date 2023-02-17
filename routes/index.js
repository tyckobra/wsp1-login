const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const db = require('../utils/database');
const promisePool = db.promise();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index.njk',
        {
            title: 'Login ALC'
        });
});

router.get('/login', async function (req, res, next) {
    res.render('login.njk',
        {
            title: 'Login'
        });
});

router.post('/login', async function (req, res, next) {
    const { username, password } = req.body;
    if (username == "" && password == "") {
        return res.send('Username is Required')
    }
    else if (username == "") {
        return res.send('Username is Required')
    }
    else if (password == "") {
        return res.send('Password is Required')
    }
    else {
        //const [users] = await promisePool.query(SELECT efusers.`name`, efusers.`password` FROM efusers)
        res.send()
    }
});

router.get('/crypt/:password', async function (req, res, next){
    console.log(req.params)
    const password = req.params.password

    bcrypt.hash(password, 10, function (err, hash) {
        console.log(hash)
        return res.json({ hash });
        
    });

})

module.exports = router;
