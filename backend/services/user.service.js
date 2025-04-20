import db from '../db/postgres.js'

// get all users
export const getAllUser = async() =>{
    const {rows} = await db.query(`SELECT * FROM users WHERE deleted_at IS NULL`);  
    return rows;
};

// get user by id
export const getUserById = async(id) =>{
    const {rows} = await db.query(`SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL`,[id]);
    return rows;
};


// create user
export const createUser = async({username, name, phone, email, gender, birthdate, role}) =>{
    const { rows } = await db.query(`
        INSERT INTO users (username, name, phone, email, gender, birthdate, role, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
        RETURNING *`,
        [username, name, phone, email, gender, birthdate, role]
    );
    return rows[0];
};


// update users 
export const updateUser = async (id, updates) =>{
    const keys = Object.keys(updates);
    const values = Object.values(updates);

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');

    const {rows} = await db.query(
        `UPDATE users SET ${setClause}, updated_at = NOW() WHERE ID = $${keys.length +1} RETURNING *`,
        [...values, id]
    );

    return rows[0];
};


// soft delete user
export const deleteUser = async(id) =>{
    const {rows} = await db.query(
        `UPDATE users SET deleted_at = NOW() WHERE id = $1 RETURNING *`,
        [id]
    );
    return rows[0];
};
