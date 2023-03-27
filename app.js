const app = require('express')();
const express = require('express');
const port = process.env.PORT || 4010;
const mongoose = require('mongoose')
const bp = require('body-parser')
const db = require('./db/modal_')
require('dotenv').config()
mongoose.connect(process.env.DB).then(()=>{
  console.log('====================================');
  console.log('server connected');
  console.log('====================================');
})

app.use(bp.urlencoded({
  extended : false
}))

app.set('view engine','ejs')

app.get('/',(req,res)=>{
  res.send(`
  <style>
  .myInp {
    background-image: url('/css/searchicon.png');
    background-position: 10px 10px;
    background-repeat: no-repeat;
    width: 100%;
    font-size: 16px;
    padding: 12px 20px 12px 40px;
    border: 1px solid #ddd;
    margin-bottom: 12px;
    border-radius: 20px;
    }
    #btn{
      width : 100%;
      font-size: 16px;
      padding: 12px 20px 12px 40px;
    border: 1px solid #ddd;
    margin-bottom: 12px;
    border-radius: 20px;
    
    }</style><form method="post" action="/" id="form">
  <input class="myInp" type="text" placeholder="Admin Password" name="p">
  <input id="btn" type="submit" value=">">
  </form>
  `)
})

app.post('/', (req, res) => {
  if(req.body.p === process.env.PASS){
  db.find().then((dta)=>{
    res.render("home",{
      dta : dta
    })
    console.log(dta)
  })}else{
    res.send('<h1><b>YOUR PASSWORD IS WRONG <br/> CONTACT WEBSITE BUILDER TO ACCESS DATA</b></h1>')
  }
})

app.get('/update_:id',(req,res)=>{
  res.render("edit",{
    id : req.params.id
  })
})

app.post('/update',async(req,res)=>{
  await db.updateOne({ _id : req.body.id},{
    $set : {
      ammount : req.body.ammount,
      date : req.body.date
    }
  }).then(()=>{
    res.redirect('/')
  })
})

app.get('/delete_:id',(req,res)=>{
  db.deleteOne({_id : req.params.id}).then(()=>{
    res.redirect('/')
  })
})
app.get('/main',(req,res)=>{
  res.send(`
  <style>
  .myInp {
    background-image: url('/css/searchicon.png');
    background-position: 10px 10px;
    background-repeat: no-repeat;
    width: 100%;
    font-size: 16px;
    padding: 12px 20px 12px 40px;
    border: 1px solid #ddd;
    margin-bottom: 12px;
    border-radius: 20px;
    }
    #btn{
      width : 100%;
      font-size: 16px;
      padding: 12px 20px 12px 40px;
    border: 1px solid #ddd;
    margin-bottom: 12px;
    border-radius: 20px;
    
    }</style>
  <form method="post" action="/main" id="form">
  <input type="text" class="myInp" name="p" placeholder="Admin Password">
  <input type="submit" id="btn" value=">">
  </form>`)
})
app.post('/main', (req, res) => {
  if(req.body.p === process.env.PASS){
    res.render('main')
  }else{
    res.send('<h1><b>YOUR PASSWORD IS WRONG <br/> CONTACT WEBSITE BUILDER TO ACCESS DATA</b></h1>')
  }
})
   

//const User = require('./db/user')




app.post('/s', (req, res) => {
  const user = new db({
    party : req.body.party,
    account : req.body.account,
    contact : req.body.number,
    ammount : req.body.ammount,
    date : req.body.date,
    duePayment : req.body.duePayment
  }).save().then((info)=>{
      res.redirect('/')
      console.log(info)
  })
  

})



app.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});