const mongoose=require('mongoose');

const EmployeeShema= new mongoose.Schema({
    Id:{
        type:Number
    },
    Name:{
        type:String
    },
    Age:{
        type:Number
    },
    Post:{
        type:String
    },
    Salary:{
        type:Number
    },
    JoinDate:{
        type:String
    },
    

},
{
    timestamps:true
}
)
const EMP=mongoose.model("Employeemodel",EmployeeShema)
module.exports=EMP;