const express = require('express')
const Article = require('./../db/models/article_schema.js');
const router = express.Router();

router.get('/new', (req,res)=>{
    res.render('article/new',{article: new Article()});
});

router.put('/:id',async (req,res,next)=>{
    req.article = await Article.findById(req.params.id);
    next();
},saveArticleOrUpdate('edit'));

router.get('/edit/:id',async (req,res)=>{
    const _id = req.params.id;
    const article = await Article.findById(_id);
    res.render('article/edit',{article});
});



router.delete('/:id',async (req, res)=>{
    try{
        await Article.findByIdAndDelete(req.params.id);
        res.redirect('/');
    }
    catch(e){
        console.log(e);
    }
});

router.get('/:slug', async (req, res) =>{
    const slug = req.params.slug;
    let article;
    try{
        article = await Article.findOne({slug});
        if(article === null){
            return res.redirect('/*');
        }
        res.render('./../views/article/show', {article: article});
    }
    catch(err){
        console.log('Error');
        res.redirect('/');
    }
});

router.post('/',async (req,res,next)=>{
    req.article = new Article();
    next();
},saveArticleOrUpdate('new'));


function saveArticleOrUpdate(path) {
    return async (req, res)=>{
        let article = req.article;
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        try{
            article = await article.save();
            res.redirect(`/article/${article.slug}`);
        }
        catch(e){
            console.log(e);
            res.render(`./../views/article/${path}.ejs`,{article});
        }
    }
}



module.exports = router;