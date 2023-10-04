const { set, connect } = require("mongoose");
const logger = require("./logger");

module.exports = async function connectDB(uri) {
  try {
    set("strictQuery", false);
    const { connection } = await connect(
      uri || "mongodb://127.0.0.1:27017/Departmental%20portal"
    );
    logger.info(
      `${connection.host} has connected to the ${connection.name} database successfully`
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
