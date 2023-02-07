const express = require('express');
const router = express.Router();

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
})

module.exports = router;
