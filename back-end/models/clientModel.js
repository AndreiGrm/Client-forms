const data = require('../data/db.json');

const getAllClients = () => data.clients;
const getClientById = (id) => data.clients.find(client => client.id == id);

module.exports = { getAllClients, getClientById };
