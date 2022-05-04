const database = require("../mysql-db.js");
const static_database = require("../json-db.js");
const User = require("../../models/user.js");
const Contact = require('../../models/contact.js');

async function execute() {
  const users = await static_database.getAll("users");
  for (const user of users)
    await database.insertInto(
      "users",
      User.properties,
      Object.values(user)
    );
    console.log("Users created.");

    const contacts = await static_database.getAll("contacts");
    for (const contact of contacts)
      await database.insertInto(
        "contacts",
        Contact.properties,
        Object.values(contact)
      );
  console.log("Contacts created.");

  database.closeConnection();
}

execute();
