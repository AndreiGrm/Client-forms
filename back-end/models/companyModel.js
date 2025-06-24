const data = require('../data/db.json');

const getAllCompanies = () => data.companies;
const getCompanyById = (id) => data.companies.find(company => company.id == id);

module.exports = { getAllCompanies, getCompanyById };