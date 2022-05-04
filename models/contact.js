const Model = require("./model.js");

class Contact extends Model {
  static tableName = "contacts";
  static foreignIdentifier = "user_id";

  static fillable_properties = ["contact"];

  static public_properties = [
    ...this.fillable_properties,
    this.foreignIdentifier,
    ...this.public_properties,
  ];

  static properties = [...this.public_properties];

  constructor() {
    super();
  }
}

module.exports = Contact;