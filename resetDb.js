const { db } = require("./models");

const resetDb = async () => {
  try {
    await db.sync({ force: true });
  } catch (e) {
    throw e;
  } finally {
    process.exit();
  }
};

resetDb();
