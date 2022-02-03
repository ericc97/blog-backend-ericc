const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api');
const mainRoutes = require('./main.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/main', mainRoutes);

router.use((req, res) =>{
    res.status(404).end();
});

module.exports = router;