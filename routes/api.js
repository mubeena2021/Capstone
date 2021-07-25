var express = require('express');
var router = express.Router();

let {Category, Answer, Question} = require('../config/model');


router.get('/categories', async function(req, res, next) {
    let categories = await Category.findAll({})
    res.json(categories)
});

router.get('/categories/:categoryId/questions', async function(req, res, next) {
    // HINT: req.query, req.query.categoryId
    console.log(req.params)
    let questions = await Question.findAll({where: {categoryId: req.params.categoryId}})
    res.json(questions)
});
router.get('/questions/:questionId/answers', async function(req, res, next) {
    // HINT: req.query, req.query.categoryId
    console.log(req.params)
    let answers = await Answer.findAll({where: {questionId: req.params.questionId}})
    res.json(answers)
});

router.get('/answers', async function(req, res, next) {
    // HINT: req.query, req.query.questionId
    let answers = await Answer.findAll({where: {questionId: 'something that you send from the front end'}})
    res.json(answers)
});

router.post('/questions/:questionId/answers', async function(req, res, next) {
    // HINT: req.query, req.query.questionId
    console.log('req.body', req.body)
    console.log('req.params', req.params)
    req.body.questionId = req.params.questionId
    console.log('the final body is', req.body)
    let answer = await Answer.create(req.body)
    res.json(answer)
});




router.post('/categories/:categoryId/questions', async function(req, res, next) {
    // HINT: req.query, req.query.questionId
    console.log('req.body', req.body)
    console.log('req.params', req.params)
    req.body.categoryId = req.params.categoryId
    console.log('the final body is', req.body)
    let question = await Question.create(req.body)
    res.json(question)
});

router.get('/test', function(req, res, next) {
    res.json({success: true})
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});




module.exports = router;
