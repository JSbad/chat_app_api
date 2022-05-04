const database = require('../mysql-db.js');
const User = require('../../models/user.js');
const Contact = require('../../models/contact.js');

async function execute(){
    await database.createTable("users", User.properties);
    console.log("Users created");
    
    await database.createTable("contacts", Contact.properties);
    console.log("Contacts created");
    
    database.closeConnection();
};

execute();

