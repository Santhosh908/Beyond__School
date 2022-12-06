const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var database=require('./database');
const PORT = 3000;
const app = express();
const fileupload=require('express-fileupload');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const catalyst = require('zcatalyst-sdk-node');
const FOLDER_ID = 2207000000014001;
app.use(express.json());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(cors());
app.use(fileupload());


app.get('/', function(req, res) {
	res.send('Hello from server')
})

app.post('/uploadFile', async (req, res) => {
  console.log(req.body.fn);
  try {
      const app = catalyst.initialize(req);
      await req.files.data.mv(`${__dirname}/upload/${req.body.fn}`);
      await app.filestore().folder(FOLDER_ID).uploadFile({
          code: fs.createReadStream(`${__dirname}/upload/${req.body.fn}`),
          name: req.body.fn
      });
      res.status(200).send({
          "status": "success",
          "message": "File Uploaded Successfully"
      })
  } catch (error) {
    throw error
    console.log("erro dude");
      res.status(500).send({
          "status": "Internal Server Error",
          "message": error
      })
  }
});


app.get("/getskills",function(req,res){
  const querry="SELECT * FROM psgskill.skills"
  database.query(querry,function(err,data){
      res.send(data)
  })
})

app.post("/thumbnail-upload",function(req,res){
  var file=req.files.thumbnail;
  let path='C:/Users/Santhosh/OneDrive/Desktop/PSG-itech/project/admin-site/front-end/src/assets/video/'+file.name;
  var uploadpath='C:/Users/Santhosh/OneDrive/Desktop/PSG-itech/project/admin-site/front-end/src/assets/video/'+file.name;
  file.mv(uploadpath,function(err){
    if(err) {return res.status(500).send(err)};
  });
})
app.post("/uploadvalues",function(req,res){
  var id=req.body.id;
  var skillname=req.body.skillname;
  var filename=req.body.fn;
  var filepath='assets/video/'+filename
  var querry=`INSERT INTO psgskill.uploaddata VALUES("${id}","${skillname}","${filename}","${filepath}",0)`;
  database.query(querry,function(err){
    if(err){
    throw err
    }
  })
})
app.post("/signup",function(req,res){
    var un=req.body[0];
    var en=req.body[1];
    var pass1=req.body[2];
    var querry=`INSERT INTO psgskill.signupdetails VALUES("${un}","${en}","${pass1}")`;
    database.query(querry,function(err){
      if(err){
      throw err
      }
    });
})
app.post("/login",(req,res)=>{
  var en=req.body[0];
  var pass1=req.body[1];
  var querry=`SELECT * FROM psgskill.signupdetails WHERE email='${en}'`;
  database.query(querry,function(err,data){
    if(err){
      throw err
    }
    else{
      console.log(data);
    }
  })
})
app.listen(PORT, function(){
    console.log("Server running on localhost:" + PORT);
  });