const dbPool = require("./db");

module.exports = {
  getDataDB: async (dataQuery) => {
    const client = await dbPool.connect();
    const result = await client.query(dataQuery);
    client.release();
    return result.rows;
  },
};
