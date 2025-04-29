import * as addressService from '../services/address.service.js'

export const createAddress = async(req, res) =>{
    try{
        const addressData = req.body;

        const newAddress = await addressService.createAddress(addressData);
        res.status(201).json({
            message : "Address created successfully",
            data : newAddress,
        })
    }catch(error){
        console.error("Error creating Address", error);
        res.status(500).json({error: "Failed to create address"});
    }
};








