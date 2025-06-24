const data = require('../data/db.json');

const getAllAccounts = () => data.accounts;
const getAccountById = (id) => data.accounts.find(account => account.id == id);

module.exports = { getAllAccounts, getAccountById };