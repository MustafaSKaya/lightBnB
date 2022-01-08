const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
})

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  let queryString = `SELECT * FROM users WHERE email LIKE $1;`;
  let values = [email];

  return pool
    .query(queryString, values)
    .then(res => res.rows[0])
    .catch(error => console.log(error))

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  let queryString = `SELECT * FROM users WHERE users.id = $1;`;
  let values = [id];

  return pool
    .query(queryString, values)
    .then(res => res.rows[0])
    .catch(error => console.log(error))
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  let queryString = `
    INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3) 
    RETURNING *;`; 
  const values = [`${user.name}`, `${user.email}`, `${user.password}`];
 
  return pool
    .query(queryString, values)
    .then(res => res.rows[0])
    .catch(error => console.log(error))
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  let queryString = `
    SELECT reservations.*, properties.*
    FROM reservations
    JOIN users ON guest_id = users.id
    JOIN properties ON reservations.property_id = properties.id
    WHERE reservations.guest_id = $1 AND reservations.end_date < Now()::date
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2`;

  return pool
    .query(queryString, [guest_id, limit])
    .then(res => res.rows)
    .catch(error => console.log(error))
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function(options, limit = 10) {
  
  const queryParams = [];
  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating 
    FROM properties 
    JOIN property_reviews ON property_id = properties.id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length}`;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `WHERE owner_id = $${queryParams.length}`;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}00`);
    queryString += ` AND cost_per_night > $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}00`);
    queryString += ` AND cost_per_night < $${queryParams.length}`;
  }

  queryString += `
  GROUP BY properties.id
  `;

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool
    .query(queryString, queryParams)
    .then((res) => {
    return res.rows;
  })
    .catch((err) => {
    console.log(err.message);
  });
}

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {

  let queryString = `
    INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;`;
    
  let values = [`${property.owner_id}`,`${property.title}`,`${property.description}`,`${property.thumbnail_photo_url}`,`${property.cover_photo_url}`,`${property.cost_per_night}`,`${property.parking_spaces}`,`${property.number_of_bathrooms}`,`${property.number_of_bedrooms}`,`${property.country}`,`${property.street}`,`${property.city}`,`${property.province}`,`${property.post_code}`]; 

  return pool
    .query(queryString, values)
    .then(res => res.rows[0])
    .catch(error => console.log(error))
}
exports.addProperty = addProperty;
