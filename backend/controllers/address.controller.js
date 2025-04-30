import * as addressService from "../services/address.service.js";

export const createAddress = async (req, res) => {
  try {
    const addressData = req.body;

    const newAddress = await addressService.createAddress(addressData);
    res.status(201).json({
      message: "Address created successfully",
      data: newAddress,
    });
  } catch (error) {
    console.error("Error creating Address", error);
    res.status(500).json({ error: "Failed to create address" });
  }
};

export const getAddressesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const addresses = await addressService.getAddressesByUserIdService(userId);
    res.status(201).json({ addresses });
  } catch (error) {
    console.error("Error getting addresses :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateAddress = async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body, updated_at: new Date() };
  try {

    const updated = await addressService.updateAddressService(id, data);

    if(!updated){
        return res.status(404).json({error : "Address not found or already deleted"});
    }
    res.status(200).json({updated}); 
  } catch (error) {
    console.error("Error updating address : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
