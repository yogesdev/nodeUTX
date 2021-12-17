var express = require('express');
var router = express.Router();
const multer = require('multer')
const path = require('path')
const imageProcess = require('../models/imageUpload')
const filePath ='/public/images/';
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, '.'+filePath)
  },
  filename: (req, file, callBack) => {     
    callBack(null,  'image-' + Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({
  storage: storage
});


router.post('/imageUpload', upload.single('file'), async function (req, res) {
  if(req.file){
    let creatRow = {
      name:req.file.filename,
      type:req.file.mimetype,
      image_path:filePath
    }
    await imageProcess.userImageUpload(creatRow);
    res.status(200).send({ response: "ok", message:"Image uploaded successfully" })
  }
  else{
    res.status(400).send({ response: "error", message:'Error in Image upload' })
  } 
});
module.exports = router;
