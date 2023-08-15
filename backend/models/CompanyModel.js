import mongoose from "mongoose";

const CompanySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    staff:String,
},
    {timestamps:true}
)

const CompanyModel = mongoose.model('CompanyDetails', CompanySchema)
export default CompanyModel;