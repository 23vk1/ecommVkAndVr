import pool from "../db/postgres.js";

export const createWallet = async (userId, initialBalance = 0) => {
  const query = `
        INSERT INTO wallet (user_id, balance, created_at, updated_at)
        VALUES ($1, $2, NOW(), NOW())
        RETURNING *;
    `;

  const values = [userId, initialBalance];
  const { rows } = await pool.query(query, values);

  return rows[0];
};

export const getWalletByUserId = async (userId) => {
  const query = `SELECT * FROM wallet WHERE user_id = $1 AND deleted_at IS NULL;`;
  const { rows } = await pool.query(query, [userId]);
  return rows[0];
};

export const updateWalletBalance = async (userId, newBalance) => {
  const query = `
        UPDATE wallet 
        SET balance = $1, updated_at = NOW()
        WHERE user_id = $2 AND deleted_at IS NULL
        RETURNING *;
    `;

  const values = [newBalance, userId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const deleteWallet = async (userId) => {
  const query = `
        UPDATE wallet 
        SET deleted_at = NOW()
        WHERE user_id = $1 and deleted_at IS NULL
        RETURNING *;
    `;

  const { rows } = await pool.query(query, [userId]);
  return rows[0];
};
