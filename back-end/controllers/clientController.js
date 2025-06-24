const Client = require('../models/clientModel');

exports.getClients = (req, res) => {
  res.json(Client.getAllClients());
};

exports.getClient = (req, res) => {
  const client = Client.getClientById(req.params.id);
  if (!client) return res.status(404).json({ error: 'Client not found' });
  res.json(client);
};
exports.createClient = (req, res) => {
  const newClient = Client.createClient(req.body);
  res.status(201).json(newClient);
};
exports.updateClient = (req, res) => {
  const updatedClient = Client.updateClient(req.params.id, req.body);
  if (!updatedClient) return res.status(404).json({ error: 'Client not found' });
  res.json(updatedClient);
};
exports.deleteClient = (req, res) => {
  const deletedClient = Client.deleteClient(req.params.id);
  if (!deletedClient) return res.status(404).json({ error: 'Client not found' });
  res.status(204).send();
}