const mongoose=require('mongoose');
const HRMainSchema=new mongoose.Schema({
    Id:{
        type:Number
    },
    Name:{
        type:String
    },
    Password:{
        type:String

    },
    Age:{
        type:Number
    },
},
{
    timestamps:true
}
)
const HRD=mongoose.model("HRmodel",HRMainSchema)
module.exports=HRD;