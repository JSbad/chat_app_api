const Model = require("./model.js");

class User extends Model {
  static tableName = "users";
  static identifier = "user_id";

  static fillable_properties = ["username"];
  static private_properties = ["password"];

  static public_properties = [
    this.identifier,
    ...this.fillable_properties,
    ...this.public_properties,
  ];

  static properties = [...this.public_properties, ...this.private_properties];
  
  constructor() {
    super();
  }
}

module.exports = User;