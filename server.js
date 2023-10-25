console.log("##################Server.js starting up##################");
const app = require("./app.js");
const dbconnect = require("./db-config.js");
const port = process.env.PORT;

dbconnect();

app.listen(port, () => {
  console.log("Server Listening started on port ", port);
});
