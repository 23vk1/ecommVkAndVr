import pool from "../db/postgres.js";

export const createAddress = async (userId, addressData) => {
  const {
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
    userId,
    pincode,
    flat_house_building,
    street_address,
    landmark,
    town_city,
    state,
    isDefault || false,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAddressesByUserIdService = async (userId) => {
  const result = await pool.query(
    `
        SELECT * FROM addresses 
        WHERE user_id = $1 AND deleted_at is null 
        ORDER BY isDefault DESC, created_at DESC`,
    [userId]
  );
  return result.rows;
};

// export const updateAddressService = async (id, data) => {
//   const {
//     pincode,
//     flat_house_building,
//     street_address,
//     landmark,
//     town_city,
//     state,
//     isDefault,
//     updated_at,
//   } = data;

//   const values = [
//     pincode,
//     flat_house_building,
//     street_address,
//     landmark,
//     town_city,
//     state,
//     isDefault,
//     updated_at,
//     id,
//   ]

//   const query = `
//   UPDATE addresses SET
//     pincode = $1,
//     flat_house_building= $2,
//     street_address = $3,
//     landmark = $4,
//     town_city = $5,
//     state = $6,
//     isDefault = $7,
//     updated_at = $8
//   WHERE id = $9 AND deleted_at is null
//   RETURNING *;
//   `;

//   const result = await pool.query(query, values);
//   return result.rows[0];
// };

export const updateAddressService = async (addressId, userId, updatedDate) => {
  const fields = Object.keys(updatedDate)
    .map((key, i) => {
      return `${key} = $${i + 1}`;
    })
    .join(", ");

  const values = [...Object.values(updatedDate), addressId, userId];

  const result = await pool.query(
    `UPDATE addresses SET ${fields}, updated_at = NOW() WHERE id = $${
      values.length - 1
    } AND user_id = $${values.length} RETURNING *`,
    values
  );

  return result.rows[0];
};

export const softDeleteAddressService = async (addressId, userId) => {
  await pool.query(
    `UPDATE addresses SET deleted_at = NOW() WHERE id = $1 AND user_id = $2`,
    [addressId, userId]
  );
};

export const setDefaultAddressService = async (userId, addressId) => {
  await pool.query(
    `UPDATE addresses SET isdefault = false WHERE user_id = $1`,
    [userId]
  );

  const result = await pool.query(
    `UPDATE addresses SET isdefault = true WHERE id = $1 AND user_id = $2 RETURNING *`,
    [addressId, userId]
  );

  return result.rows[0];
};
