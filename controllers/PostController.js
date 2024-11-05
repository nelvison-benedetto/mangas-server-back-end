const posts = require('../db/storeposts.js');
const fs = require('fs');

const index = (req,res)=>{
    const responseData = {
        data : posts,
        counter : posts.length
    };
    return res.status(200).json(responseData);
};

const store = (req,res)=>{
    console.log(req.body);
    const post = {
        id : posts[posts.length-1].id+1,
        title : req.body.title,
        slug : req.body.slug,
        content : req.body.content,
        image : req.body.image,
        tags : req.body.tags,
    };
    posts.push(post);
    fs.writeFileSync('../db/storeposts.js',`module.exports = ${JSON.stringify(posts,null,4)}`);
    return res.json({
        status : 201, 
        data : posts,
        counter : posts.length
    });
};

const update = (req,res)=>{
    //console.log('go update');
    const postIndex = posts.findIndex((intem,index)=> intem.id === Number(req.params.id));
      //se non trova return -1
    console.log(postIndex);
    if(postIndex===-1){  //!post sarebbe ambiguo con posts[0] e un post mancante (-1)
        return res.status(404).json({
            error : '404 Not Found'
        });
    }
    const newpost = {
        ...posts[postIndex], // create copy of actual posts[postIndex]
        title: req.body.title || posts[postIndex].title,  //overwrite only if found posts[postIndex].title
        slug: req.body.slug || posts[postIndex].slug,
        content: req.body.content || posts[postIndex].content,
        image: req.body.image || posts[postIndex].image,
        tags: req.body.tags || posts[postIndex].tags
    }
    posts[postIndex] = newpost;
    fs.writeFileSync('../db/storeposts.js',`module.exports=${JSON.stringify(posts,null,4)}`);
    return res.status(200).json({
        data: newpost
    });
};


module.exports = {
    index,
    store,
    update
}