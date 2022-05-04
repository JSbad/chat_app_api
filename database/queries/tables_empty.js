const database = require('../mysql-db.js');

async function execute() {
    await database.deleteFrom("users");
    console.log("Users emptied");

    await database.deleteFrom("contacts");
    console.log("Contacts emptied");

    database.closeConnection();
};

execute();
