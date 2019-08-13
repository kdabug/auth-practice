const { User } = require("./models/index");
const bcrypt = require("bcrypt");
require("dotenv").config();

const seedDb = async () => {
  try {
    // clear out data in tables specified below
    await User.destroy({
      where: {}
    });

    // encrypt password using bcrypt (because you should
    // never store plain text passwords in a database
    const encryptedPassword = async password => {
      const encrypted = await bcrypt.hash(
        password, // hardcode password for now
        Number(process.env.SALT_ROUNDS)
      );
      return encrypted;
    };

    // add records to tables specified below
    await User.create({
      name: "Carol Danvers",
      email: "captainmarvel@fakemail.com",
      password: await encryptedPassword("loveTony")
    });

    await User.create({
      name: "Tony Stark",
      email: "ironman@fakemail.com",
      password: await encryptedPassword("geniusPower")
    });
  } catch (e) {
    console.log(e);
  }
};

const run = async () => {
  try {
    await seedDb();
  } catch (e) {
    console.log(e);
  } finally {
    await process.exit();
  }
};

run();
