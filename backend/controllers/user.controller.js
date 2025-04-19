import pool from "../config/db.postgres.js";

export const createUser = async (req, res) => {
  try {
    const { username, name, phone, email, gender, birthdate, role } = req.body;

    const result = await pool.query(
      `INSERT INTO users(username, name, phone, email, gender, birthdate, role, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *`,
      [username, name, phone, email, gender, birthdate, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating User", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getAllUsers = async(req, res) =>{
  try{
    const result = await pool.query(`SELECT * FROM users ORDER BY id DESC`);
    res.status(201).json(result.rows);
  }catch(err){
    console.error("Error getting users");
    res.status(500).json({error : "Internasl Server Error"});
  }
};







