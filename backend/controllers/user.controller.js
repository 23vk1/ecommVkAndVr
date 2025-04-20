// import pool from "../db/postgres.js";
import * as userServices from "../services/user.service.js";

// create user
export const createUser = async (req, res) => {
  try {
    const user = await userServices.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error("Error creating User", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userServices.getAllUser();
    res.status(201).json(users);
  } catch (err) {
    console.error("Error getting users", err);
    res.status(500).json({ error: "Internasl Server Error" });
  }
};

// get user by id
export const getUserById = async (req, res) => {
  try {
    const user = await userServices.getUserById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server Error" });
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    const user = await userServices.updateUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).jso({ error: "Internal server error" });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await userServices.deleteUser(req.params.id);
    res.status(200).json({ message: "user deleted", user});
  } catch (err) {
    res.status(500).json("internal server error");
  }
};
