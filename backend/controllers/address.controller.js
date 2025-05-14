import * as addressService from "../services/address.service.js";

export const createAddress = async (req, res) => {
  try {
    const addressData = req.body;
    const userId = req.user.id;
    const newAddress = await addressService.createAddress(userId, addressData);
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
  // const { userId } = req.params;

  try {
    const userId = req.user.id;
    const addresses = await addressService.getAddressesByUserIdService(userId);
    res.status(200).json({ addresses });
  } catch (error) {
    console.error("Error getting addresses :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const updateAddress = async (req, res) => {
//   const { id } = req.params;
//   const data = { ...req.body, updated_at: new Date() };
//   try {

//     const updated = await addressService.updateAddressService(id, data);

//     if(!updated){
//         return res.status(404).json({error : "Address not found or already deleted"});
//     }
//     res.status(200).json({updated});
//   } catch (error) {
//     console.error("Error updating address : ", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { addressId } = req.params;
    const updated = await addressService.updateAddressService(
      addressId,
      userId,
      req.body
    );

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Address not found or unauthorized" });
    }
    res
      .status(200)
      .json({ message: "Adderss updated successfully", address: updated });
  } catch (error) {
    console.error("Error updating address", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// soft delete a specific address

export const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { addressId } = req.params;

    await addressService.softDeleteAddressService(addressId, userId);

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// set an address as default

export const setDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { addressId } = req.params;

    const updated = await addressService.setDefaultAddressService(
      userId,
      addressId
    );
    if (!updated) {
      return res
        .status(404)
        .json({ message: "Adderss not found or Unauthorized" });
    }
    res
      .status(200)
      .json({ message: "Address updated successfully", address: updated });
  } catch (error) {
    console.error("Error setting default address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
