const express = require('express')
const Author = require('../models/author')
const router = express.Router()

router.get('/',async(req,res)=>{
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== " "){
        searchOptions.name = new RegExp(req.query.name, 'i')
        console.log(searchOptions)
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index',{
            authors : authors,
            searchOptions : req.query
        })
    }
    catch{
             res.redirect('/')
    }
})

router.get('/new',(req,res)=>{
    res.render('authors/new',{ 'author' : new Author()})
})

router.post('/',async(req,res)=>{
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save()
        res.redirect(`authors`)
    }
    catch{
        res.render('authors/new',{
            author : author,
            errMessage :"Error creating new author"
        })
        
    }
    })

module.exports = router