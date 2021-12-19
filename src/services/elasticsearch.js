const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({
  host: process.env.ELASTIC_SEARCH_HOST,
  log: "error",
  apiVersion: "7.2",
  keepAlive: true,
  requestTimeout: 6000,
  maxSockets: 100,
  deadTimeout: 6000,
});
elasticsearch.Client.apis['master'].ping.spec.requestTimeout = 6000;

module.exports = { client };
