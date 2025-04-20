import express from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js";
import { createUserValidation } from "../validations/user.validation.js";
import { validationResult } from "express-validator";

const router = express.Router();

// create user 
router.post("/", createUserValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return createUser(req, res);
});

// get all users
router.get("/", getAllUsers);

// get user by id
router.get('/:id', getUserById);

// update user
router.put('/:id', updateUser);

// delete user
router.delete('/:id', deleteUser);


export default router;
