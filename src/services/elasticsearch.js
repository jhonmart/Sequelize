const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({
  host: process.env.ELASTIC_SEARCH_HOST,
  log: "trace",
  apiVersion: "7.2",
  keepAlive: true,
  requestTimeout: 6000,
  maxSockets: 100,
  deadTimeout: 6000,
});
elasticsearch.Client.apis['master'].ping.spec.requestTimeout = 6000;
client.ping(
  {
    requestTimeout: 2000,
  },
  function (error) {
    console.log("Try to " + process.env.ELASTIC_SEARCH_HOST);
    console.trace(
      error ? "Elasticsearch cluster is down!" : "Elasticsearch is well"
    );
  }
);

module.exports = { client };
