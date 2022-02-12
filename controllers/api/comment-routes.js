const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) =>{
    Comment.findAll({
        attributes: ['comments_text', 'user_id', 'post_id'],
        order: ['created_at']
    })
    .then(dbCommentsData => res.json(dbCommentsData))
    .catch(err =>{
        console.log(err);
        res.status(400).json(err)
    })
});

router.post('/', withAuth, (req, res) =>{
    if(req.session){
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
        .then(dbCommentsData => res.json(dbCommentsData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    }
});

router.delete('/:id', withAuth, (req, res) =>{
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentsData =>{
        if(!dbCommentsData){
            res.status(404).json({ message: 'No Comments to delete.'});
        }
        res.json(dbCommentsData)
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err)
    })
});

module.exports = router;