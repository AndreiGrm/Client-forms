const data = require('../data/db.json');

const getAllUsers = () => data.users;
const getUserById = (id) => data.users.find(user => user.id == id);

module.exports = { getAllUsers, getUserById };