//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "I love being creative with different projects and ideas and blogging allows me to express that. I love thinking of new content ideas, ways of making topics that are personal to me interesting and unique. There aren’t any restrictions when it comes to the amount of content you can create on your blog, how you talk about a specific topic and how creative you can be and that’s one of the things I love the most about being a blogger. I sometimes find myself getting carried away with the creativity and 2000 words later, I’m left with an essay rather than a blog post but it’s all a part of the fun.";
const aboutContent = "When I first started blogging, I didn’t expect to branch out in terms of talking to new people, I’ve always been that person who likes staying in her own little bubble but when I started following fellow bloggers, commenting on their posts and so on, I realised what an amazing community that coincides with this whole blogging game. My 15-year-old self wouldn’t believe it but it turns out that through blogging comes the amazing fortune of friendship. The blogging community is also an incredible one and I love how so many bloggers join forces to encourage, support and motivate each other, it’s amazing to be a part of.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const postMade =[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) =>{
  res.render("home",{homeContent: homeStartingContent,
    postMade : postMade});
});

app.get("/about", (req, res) =>{
  res.render("about",{aboutContent: aboutContent});
});

app.get("/contact", (req, res) =>{
  res.render("contact",{aboutContact: contactContent});
});

app.get("/compose", (req, res) =>{
  res.render("compose");
});

app.post("/compose",(req, res) =>{
  const post ={
    Title : req.body.newTitle,
    Post : req.body.newPost
  };
    
  postMade.push(post);
  res.redirect("/");
  
});

app.get("/postMade/:postName",(req, res) =>{
  const requestedTitle = _.lowerCase(req.params.postName);
  
 
  postMade.forEach(post =>{
    const postMadeTtl= _.lowerCase(post.Title);
    if (requestedTitle === postMadeTtl) {
      res.render("post",{title:post.Title, content:post.Post});
    }
  });
  
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
