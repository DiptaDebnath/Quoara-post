const express = require("express");
const path =  require("path");
const app = express();
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');


app.use(express.urlencoded({extended : true}));
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"/views"));
app.use(methodOverride('_method'));


app.use(express.static(path.join(__dirname,"/public")));
let posts  = [
    {
        username : "Dipta" ,
        id : uuidv4(),
        content : "i love web development"
    },
    {
        username : "shradha" ,
        id : uuidv4(),
        content : "i love teaching"
    },
    {
        username : "luffy" ,
        id : uuidv4(),
        content : "i am king of the pirates"
    }


];

app.listen(port , ()=>{
    console.log(`server is running on ${port}`);
});

app.get("/" , (req,res)=>{
    res.render("index.ejs" , {posts});
});

app.get("/post/new",(req,res)=>{
    res.render("post.ejs");
});

app.post("/post",(req,res)=>{
    let { username, content } = req.body;
    posts.push({
        username : username,
        id : uuidv4(),
        content : content
    });
    res.redirect("/");
});

app.get("/post/Details/:id", (req, res) => {
    let ID = req.params.id;
    let seePost = posts.find((element) => element.id === ID);

    if (seePost) {
        res.render("Details.ejs", { seePost });
    } else {
        res.status(404).send("Post not found");
    }
});


app.get("/post/Edit/:id",(req,res)=>{
    let  ID  = req.params.id
    let seePost = posts.find((Element)=>(
        Element.id === ID
    ));

    res.render("Edit.ejs", { seePost });

});

app.patch("/post/Edit/:id",(req,res)=>{
    let  ID  = req.params.id
    let newContent = req.body.content;
    let seePost = posts.find((Element)=>(
        Element.id === ID
    ));
    seePost.content = newContent;
    console.log(seePost);
    res.redirect("/");    
});

app.delete("/post/delete/:id",(req,res)=>{
    let  ID  = req.params.id
    let newPost = posts.filter((Element)=>(
        Element.id != ID
    ));
    posts = newPost;
    res.redirect("/"); 
     
})

