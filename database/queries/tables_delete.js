const database = require('../mysql-db.js');

async function execute() {
    await database.dropTable("users");
    console.log("Users deleted");

    await database.dropTable("contacts");
    console.log("Contacts deleted");

    database.closeConnection();
};

execute();
