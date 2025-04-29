import pool from "../db/postgres.js";

export const createAddress = async (addressData) => {
  const {
    user_id,
    pincode,
    flat_house_building,
    street_address,
    landmark,
    town_city,
    state,
    isDefault,
  } = addressData;

  const query = `
    INSERT INTO addresses 
    (user_id, pincode, flat_house_building, street_address, landmark, town_city, state, isDefault, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
    RETURNING *;
    `;

  const values = [
    user_id,
    pincode,
    flat_house_building,
    street_address,
    landmark,
    town_city,
    state,
    isDefault,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};
