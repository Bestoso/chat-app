const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('home', {
        title: 'Home Page'
    })
});

router.get('/chat', (req, res) => {
    res.render('chat', {
        title: 'Chat Page'
    })
});

router.get('*', (req, res) => {
    res.render('404', {
        title: '404 || Not Found'
    })
});

module.exports = router;