const data = require('../data/db.json');

const getAllResidences = () => data.residences;
const getResidenceById = (id) => data.residences.find(residence => residence.id == id);

module.exports = { getAllResidences, getResidenceById };