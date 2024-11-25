//controllers/PostController.js
const posts = require('../db/storeposts.js');
const fs = require('fs');

const index = (req,res)=>{    //INDEX
    return res.status(200).json({
        data : posts,
        counter : posts.length
    });
};

const show = (req,res)=>{    //SHOW
    const postIndex = posts.findIndex((intem,index)=> intem.id === Number(req.params.id));
    console.log(postIndex);
    if(postIndex===-1){  //!post sarebbe ambiguo con posts[0] e un post mancante (-1)
        return res.status(404).json({
            error : '404 Not Found'
        });
    }
    return res.status(200).json({
        data : posts[postIndex]
    });
};

const store = (req,res)=>{    //STORE
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
    try{  
        fs.writeFileSync('../db/storeposts.js',`module.exports = ${JSON.stringify(posts,null,4)}`);
        return res.status(201).json({  //201 created new resources
            data : posts,
            counter : posts.length
        });
    }
    catch{
        return res.status(500).json({ error: 'Error storing the post data.' });
    }
};

const update = (req,res)=>{    //UPDATE
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
    try{
        fs.writeFileSync('../db/storeposts.js',`module.exports=${JSON.stringify(posts,null,4)}`);
        return res.status(200).json({
            data : newpost,
        });
    }
    catch{
        return res.status(500).json({ error: 'Error updating the post data.' });
    }
};

const destroy = (req,res)=>{    //DESTROY
    const postIndex = posts.findIndex((intem,index)=> intem.id === Number(req.params.id));
    if(postIndex===-1){  //!post sarebbe ambiguo con posts[0] e un post mancante (-1)
        return res.status(404).json({
            error : '404 Not Found'
        });
    }
    posts.splice(postIndex, 1);  //!non riassegnare gli id ma nella lista lasciare buchi perche gli id sono unici!, ma puoi crearne incrementali
    try{
        fs.writeFileSync('../db/storeposts.js',`module.exports=${JSON.stringify(posts,null,4)}`);
        return res.status(200).json({
            data : posts,
            counter : posts.length
        });
    }
    catch{
        return res.status(500).json({ error: 'Error deleting the post data.' });
    }
};

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}


