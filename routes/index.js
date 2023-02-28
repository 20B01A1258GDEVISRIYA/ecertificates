var express = require('express');
const { db } = require('../firebase');
var router = express.Router();
/* GET home page. */
const formData = {
  regno:"",
  purpose:""
}
const studentdetails={
  name:"",
  regno:"",
  course:"",
  year:"",
  branch:"",
  academic:"",
  purpose:"",
  date:""
}
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/validate',function(req,res,next){
  const name=req.query.name;
  const password=req.query.password;
  if(name=="admin" && password=="admin")
  {
    res.render('student');
  }
  else
  {
    res.render('error copy');
  }
})
router.get('/Study', function(req, res, next) {
  db.collection("students").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // console.log(formData.regno);
        if(doc.data().regno==formData.regno)
        {
           studentdetails.name=doc.data().name;
           studentdetails.regno=doc.data().regno;
           studentdetails.branch=doc.data().branch;
           studentdetails.course=doc.data().course;
           studentdetails.year=doc.data().year;
           studentdetails.academic=doc.data().academicyear;
           studentdetails.purpose=formData.purpose;
           let ts=Date.now();
           let date_ob=new Date(ts);
           let date=date_ob.getDate();
           let month = date_ob.getMonth() + 1;
           let year = date_ob.getFullYear();
           studentdetails.date=(date+"-"+month+"-"+year);
           res.render('certificates/Study',{data:studentdetails});
          //  console.log(doc.data());
          //  console.log('success');
           console.log(studentdetails);
        }
    });
});
});

router.get('/Concern', function(req, res, next) {
  res.render('certificates/Concern', { title: 'Express' });
});
router.get('/Custodian', function(req, res, next) {
  res.render('certificates/Custodian', { title: 'Express' });
});
router.get('/Fee', function(req, res, next) {
  res.render('certificates/Fee', { title: 'Express' });
});
router.get('/Internship', function(req, res, next) {
  res.render('certificates/Internship', { title: 'Express' });
});
router.get('/Residence', function(req, res, next) {
  res.render('certificates/Residence', { title: 'Express' });
});
router.get('/StudyConduct', function(req, res, next) {
  res.render('certificates/StudyConduct', { title: 'Express' });
});
router.get("/submits",(req, res, next) => {
  const regno=req.query.regno;
  const purpose=req.query.purpose;
  formData.regno=regno;
  formData.purpose=purpose;
  console.log(regno,purpose);
  try {
    db.collection("students")
      .where("regno", "==", regno)
      .get()
      .then((docs) => {
        if (docs.size > 0) {
          res.render("verified");
        } else {
          res.render("oops");
        }
      });
  } catch (error) {
    res.json("error");
  }
});
module.exports = router;
