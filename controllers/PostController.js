const posts = require('../db/storeposts.js');
const fs = require('fs');

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

module.exports = {
    store
}