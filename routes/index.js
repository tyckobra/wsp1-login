const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../utils/database');
const session = require('express-session');
const { render } = require('nunjucks');
const validator = require('validator');
const promisePool = pool.promise();


/* GET home page. */
router.get('/', async function (req, res, next) {
    const [rows] = await promisePool.query("SELECT tb02forum.*, tb02users.name AS author FROM tb02forum JOIN tb02users on tb02forum.title = tb02users.id ORDER BY id DESC");
    res.render('index.njk',
        {
            rows: rows,
            title: 'User Forum Home',
            user: req.session.user
        });
});

router.get('/login', async function (req, res, next) {
    if (req.session.user) {
        return res.send('Already signed in')
    } 
    else { res.render('login.njk',
        {
            title: 'Login',
            user: req.session.user
        });
    }
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
        const [user] = await promisePool.query(`SELECT * FROM tb02users WHERE name = ?`, [username])
        bcrypt.compare(password, user[0].password, function (err, result) {
            if (result === true) {
                req.session.user = user[0]  //Ifall det går att logga in, spara användarens data i sessions variabeln 'user'
                return res.redirect('/profile')

            }
            else {
                return res.send('Invalid username or password')
            }
        })
    }
});

router.get('/loginposts', async function (req, res, next) {
    res.render('loginposts.njk',
        {
            title: 'Login',
            user: req.session.user
        });
});

router.post('/loginposts', async function (req, res, next) {
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
        const [user] = await promisePool.query(`SELECT * FROM tb02users WHERE name = ?`, [username])
        bcrypt.compare(password, user[0].password, function (err, result) {
            if (result === true) {
                req.session.user = user[0]  //Ifall det går att logga in, spara användarens data i sessions variabeln 'user'
                return res.redirect('/posts')
            }
            else {
                return res.send('Invalid username or password')
            }
        })
    }
});


router.get('/profile', async function (req, res, next) {
    const [rows] = await promisePool.query("SELECT * FROM tb02forum");
    if (req.session.user) {
        res.render('profile.njk', {
            rows: rows,
            name: req.session.user.name,
        })
    }
    else {
        return res.redirect('/login')
    }
})

/*router.post('/profile', async function (req, res, next) {
    const [rows] = await promisePool.query("SELECT * FROM tb02forum");
    const user = req.session.user
    if (user)
})*/

router.post('/logout', async function (req, res, next) {
    if (req.session.user) {
        req.session.destroy()
        return res.redirect('/')
    }
    else {
        return res.status(401).send('Access denied')
    }
})

router.get('/register', async function (req, res, next) {
    res.render('register.njk', {
        user: req.session.user
    })
})

router.post('/register', async function (req, res, next) {
    const { username, password, passwordConfirmation } = req.body;
    if (username === "" && password === "" && passwordConfirmation === "") {
        return res.send('Username is Required')
    }
    else if (username === "") {
        return res.send('Username is Required')
    }
    else if (password === "") {
        return res.send('Password is Required')
    }
    else if (passwordConfirmation === "") {
        return res.send('Passwords should match')
    }

    if (password == passwordConfirmation) {

        bcrypt.hash(password, 10, async function (err, hash) {
            console.log(hash)
            const [rows] = await promisePool.query("SELECT * FROM tb02users WHERE name = ?", [username])
            console.log(rows[0])
            if (rows.length === 0) {
                const [user] = await promisePool.query("INSERT INTO tb02users (name, password) VALUES (?, ?)", [username, hash])
                req.session.user = user[0]
                return res.redirect('/profile')
            }
            else {
                return res.send('Username is already taken')
            }
        });

    }
    else {
        return res.send('Passwords do not match')
    }
})

router.get('/crypt/:password', async function (req, res, next) {
    console.log(req.params)
    const password = req.params.password

    bcrypt.hash(password, 10, function (err, hash) {
        console.log(hash)
        return res.json({ hash });

    });

})

router.get('/posts', async function (req, res, next){
    if (req.session.user) {
    res.render('posts.njk', { 
        title: 'Create Post',
        name: req.session.user.name,
        user: req.session.user
    }); 
    } else {
        res.redirect('/loginposts')
    }
});

router.post('/posts', async function (req, res, next) {
    const { title, content } = req.body;
    const authorId = req.session.user.id;
    const author = req.session.user.name;
    if(title.length < 3){
        res.json('Title must be at least 3 characters');
    }
    else if(content.length < 10){
        res.json('Content must be at least 10 characters');
    }
    else{
        if(req.session.user){
            const sanitize = (str) => {
                let temp = str.trim();
                temp = validator.stripLow(temp);
                temp = validator.escape(temp);
                return temp;
            };
            const sanitizedTitle = sanitize(title);
            const sanitizedContent = sanitize(content);
            const [rows] = await promisePool.query('INSERT INTO tb02forum (authorId, author, title, content) VALUES (?, ?, ?, ?)', [authorId, author, sanitizedTitle, sanitizedContent]);
            res.redirect('/forum',[0],[0],rows)
        }else {
            res.redirect('/login')
        }
    }
});



router.get('/forum', async function(req, res, next) {
    const [rows] = await promisePool.query("SELECT * FROM tb02forum");
    res.render('forum.njk', {
        rows: rows,
        title: 'Forum',
        user: req.session.user
    });
});

router.post('/forum', async function(req, res, next) {
    
});



module.exports = router;
