import bcrypt from 'bcrypt';
import pool from '../db/postgres.js';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = async(req, res) =>{
    const {username, email, password, role} = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users(username, email, password, role, created_at)
            VALUES($1, $2, $3, $4, NOW()) RETURNING *`,
            [username, email, hashedPassword, role || 'CUSTOMER']
        );
        
        const user = result.rows[0];
        res.status(201).json({user, token:generateToken(user)})

    }catch(err){
        console.error('Registration error', err);
        res.status(500).json({error: "User registratio failed"});
    }
}

export const loginUser = async(req, res)=>{
    const {email, password}= req.body;
    console.log("email", email, "password", password);
    

    try{
        const result = await pool.query('SELECT * FROM users WHERE email = $1',[email]);
        
        const user = result.rows[0];
        
        if(!user) return res.status(404).json({error : 'User Not found'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({error : "Invalid credential"});

        res.json({user, token:generateToken(user)});
    }catch(err){
        console.error("Login error", err);
        res.status(500).json({error: "Login failed"});        
    }
}









