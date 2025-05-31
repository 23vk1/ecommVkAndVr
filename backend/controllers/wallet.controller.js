import {
  createWallet,
  updateWalletBalance,
  getWalletByUserId,
  deleteWallet,
} from "../services/wallet.service.js";

export const createUserWallet = async (req, res) => {
  try {
    const { user_id, balance } = req.body;
    const wallet = await createWallet(user_id, balance || 0);
    res.status(200).json({ success: true, wallet });
  } catch (error) {
    console.error("Error creating user wallet", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getUserWallet = async (req, res) => {
  try {
    const { user_id } = req.params;
    const wallet = await getWalletByUserId(user_id);
    if (!wallet) {
      res.status(404).json({ success: false, message: "Wallet not found" });
    }
    res.status(200).json({ success: true, wallet });
  } catch (error) {
    console.error("Error getting user wallet");
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateUserWallet = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { balance } = req.body;
    const wallet = await updateWalletBalance(user_id, balance);
    res.status(200).json({ success: true, wallet });
  } catch (error) {
    console.error("Error updating user wallet", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteUserWallet = async (req, res) => {
  try {
    const { user_id } = req.params;
    console.log(user_id);
    
    const wallet = await deleteWallet(user_id);
    res.status(200).json({ success: true, wallet });
  } catch (error) {
    console.error("Error deleting user wallet",error);
    res.status(500).json({ success: false, message: "Internasl server error" });
  }
};
