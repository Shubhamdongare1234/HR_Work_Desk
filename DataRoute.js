var express=require('express');
var bcrypt=require('bcrypt');
var router=express.Router();
var cors=require('cors');
router.use(cors());
var HRD=require('../Model/HRmainModel');
var EMP=require('../Model/Employee');
const { genSalt } = require('bcrypt');
router.post('/createHR',async(req,res,next)=>{

    const salt=await bcrypt.genSalt(10);
    const Initalpassword=await bcrypt.hash(req.body.Password,salt);
    console.log(Initalpassword);
    let Hr=new HRD({
        Id:req.body.Id,
        Name:req.body.name,
        Password:Initalpassword,
        Age:req.body.age
    })
    Hr.save()
    .then(response=>{
        res.send({error:false,message:"data added successfully"});
    })
    .catch(error=>{
        res.send({error:true,message:"error in record insertion"});
    })
});
router.post('/login',async(req,res,next)=>{
    const name=req.body.username;
    const password=req.body.Password;
    
    console.log(name);
    console.log("hi");
    console.log(password);
    const data=await HRD.findOne({Name:name});
    if(data){
        // console.log(data);
         //console.log(data.Name);
         const isSame= await bcrypt.compare(password,data.Password);
        if(isSame){
            res.send({message:"login successfull"});

        }
        else{
           // console.log("here");
            res.send({message:"login unsuccessfull due to wrong password"});

        }
       
    }
    else{
        res.send({error:true,message:"no member found of this name"});
    }
    
    
});
router.post('/createEmp',async(req,res,next)=>{
    const employe=new EMP({
        Id:req.body.id,
        Name:req.body.name,
        Age:req.body.age,
        Post:req.body.post,
        Salary:req.body.salary,
        JoinDate:req.body.JoinDate

    })
    console.log(employe);
    employe.save()
    .then(response=>{
        res.send({data:employe,message:"employee added"});
    })
    .catch(err=>{
        res.send({error:true,message:"error in data insertion"});
    })
});
router.get('/getallEmp',async(req,res,next)=>{
  const data=await EMP.find({})
  .then(response=>{
    res.send(response);
  })
  .catch(err=>{
    res.send({error:true,message:"error in record finding"});
  })
});
router.get('/getOneEmp/:id',async(req,res,next)=>{
    const id=req.params.id;
    await EMP.find({Id:id})
    .then(response=>{
        res.send(response);
    })
    .catch(err=>{
        res.send({error:true,message:"erro in single record"});
    })

});
router.post('/Delte/:id',async(req,res,next)=>{
    const id=req.params.id;
    console.log(id);
    await EMP.deleteOne({Id:id})
    .then(response=>{
        res.send({error:false,message:"data deleted"});
    })
    .catch(err=>{
        res.send({message:"error id delete"});
    })
})
router.post('/Update',async(req,res,next)=>{
    const filter={Id:req.body.id};
    const data={
        Post:req.body.post,
        Age:req.body.age,
        Salary:req.body.salary,
        JoinDate:req.body.date
    }
    await EMP.findOneAndUpdate(filter,data,{new:true})
    .then(response=>{
        res.send({error:false,message:"Data updated"});
    })
    .catch(err=>{
        res.send({error:true,message:"error in updation"});
    })
})
module.exports=router;