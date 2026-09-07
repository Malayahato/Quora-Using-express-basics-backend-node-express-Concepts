const express = require("express");
const app = express();
const port=8080;

// require uuid
const{v4: uuidv4}=require("uuid");
uuidv4();

// require override methodd
const methodOverride =require("method-override");
app.use(methodOverride('_method'))
// middlewares to read frontend data
app.use(express.urlencoded({extended: true}));

// create route
app.get("/",(req,res)=>{
    res.send("Serving Working well!!");
});
//path for serve the form
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
});
//path to add the new form 
app.post("/posts",(req,res)=>{
    let {username, content}=req.body;
    let id = uuidv4();
    posts.push({id ,username,content});
    //console.log(req.body);//in post request come in req body
    // res.send("post request working");
    res.redirect("/posts");
    
    
});
app.get("/posts/:id",(req,res)=>{
   let {id} = req.params;
   let post = posts.find((p) => id == p.id);
   res.render("show.ejs",{post});
//    console.log(post);
   
//    res.send("request working");

});

const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
// -------------POST ARRAY.................
let posts =[
    {   id:uuidv4(),
        username: "Malay",
        content : " I love coding"
    },
    {  
        id:uuidv4(),
        username: "Aryan",
        content : " I am very excited  today"

    },
    {
        id:uuidv4(),
        username: "RaviKishan",
        content : " hey guys whatshappppp!!"

    }
];


app.get("/posts",(req,res) => {
    res.render("index.ejs",{posts});
});
//patch route
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post = posts.find((p) => id == p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p) => id == p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts =posts.filter((p)=>id !== p.id);
    
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log("listening on port :8080");
});
