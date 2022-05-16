const database = require("../database/mysql-db.js");

class Model {
    static tableName = "";
    static identifier = "";
    static foreignIdentifier = "";

    static fillable_properties = [];
    static properties = [];
    static private_properties = [];
    static public_properties = ["date_updated", "date_created"];

    constructor(values) {
        
    }

    //Return all items
    static async getAll() {
        const [results, error] = await database.select(this.tableName, this.public_properties);
        return [results, error];
    }

    //Return items where property is equal to value
    static async getBy(property, value) {
        const [results, error] = await database.selectWhere(this.tableName, this.properties, property, value);
        return [results, error];
    }

    static async getById(value) {
        return await this.getBy(this.identifier, value)
    }

    static async getByForeignId(value) {
        return await this.getBy(this.foreignIdentifier, value)
    }

    //Create item
    static async create(values) {
        const [results, error] = await database.insertInto(this.tableName, this.properties, values);
        return [results, error];
    }

    toString(){
        return this.toJSON();
    }

    toJSON(){
        return {};
    }
}

module.exports = Model;