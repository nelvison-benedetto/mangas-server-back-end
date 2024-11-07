const HOST = process.env.HOST;
const PORT = process.env.PORT;

const express = require('express');
const app = express();

const PostsRouter = require('./routers/posts.js');
app.use(express.json());

app.listen(PORT, (req,res)=>{
    console.log(`Server is running at ${HOST}:${PORT}`);
});


// https://github.com/fabiopacifici/node_132/tree/main/live-pizza-express#lets-create-a-custom-error-handler-middleware
// middleware to trigger a 500 error
app.use('/posts', (req, res, next) => {
    throw new Error("You broke everything dude!");
  }); 



app.get('/',(req,res)=>{
    res.send('Main Page')
});
app.use('/:slug',PostsRouter);




app.use((err,req,res,next)=>{
    console.log("Error",err.message);
    console.error(err.stack);
    res.status(500).send({
        message : "Something went wrong",
        error : err.message
    });
});