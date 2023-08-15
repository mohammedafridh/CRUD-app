import CompanyModel from "../models/CompanyModel.js";

//create company details
export const createDetails = async(req,res)=>{
    const{name,address,contactNumber,staff} = req.body
    const exists = await CompanyModel.findOne({name})

    try{
        if(!name || !address || !contactNumber){
            throw Error('*All Fields must be filled!')
        }if(contactNumber.length!==10){
            throw Error('*Contact Number must be 10 digits!')
        }if(exists){
            throw Error('Company Name Exists')
        }else{
            const details = await CompanyModel.create(req.body)
            res.status(200).json(details)
        }
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

//view a company details based on id
export const getDetails = async(req,res)=>{
    const id = req.params.id
    const details = await CompanyModel.findById(id)

    try{
        if(details){
            res.status(200).json(details)
        }else{
            res.status(403).json('Details not found')
        }
    }catch(error){
        res.status(500).json({error:error.message})
    }
}


//view all company details
export const getAllDetails = async(req,res)=>{
    const searchTerm = req.query.search || ''
    const id = req.params._id
    try{
        const details = await CompanyModel.find({name:{$regex:searchTerm, $options:'i'}})
        res.status(200).json(details)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

//update company details using id
export const updateDetails = async(req,res)=>{

    const{name,address,contactNumber} = req.body
    const company = await CompanyModel.findById(req.params.id)
    let exists

    try {
    if(name!==company.name){
        exists = await CompanyModel.findOne({name})
    }if(exists){
        throw Error('Company Name Exists!')
    }
    // if(contactNumber.length!==9){
    //         throw Error('*Contact number is wrong!')
    //     }
        else{
      const details = await CompanyModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).json(details)
        }
    } catch (error) {
      res.status(500).json({ error:error.message})
    }
}

//delete company details
export const deleteDetails = async(req,res)=>{
    try{
        await CompanyModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Deleted Successfully')
    }catch(error){
        res.status(500).json({error:error.message})
    }
}