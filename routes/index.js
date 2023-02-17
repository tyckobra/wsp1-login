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
    if (username === "" && password === "") {
        return res.send('Username is Required')
    }
    else if (username === "") {
        return res.send('Username is Required')
    }
    else if (password === "") {
        return res.send('Password is Required')
    }
    else {
        //const [users] = await promisePool.query(SELECT efusers.`name`, efusers.`password` FROM efusers)
        //res.send()
        const [user] = await promisePool.query(`SELECT * FROM efusers WHERE name = ?`, [username])
        console.log(user[0])
        bcrypt.compare(password, user[0].password, function (err, result) {
            if(result === true)
            {
                return res.redirect('/profile')
            }
            else {
                return res.send('Invalid username or password')
            }
        })
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
