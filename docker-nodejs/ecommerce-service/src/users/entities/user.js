// Entidad User.

class User {
    static schema = {
      type: "object",
      properties: {
        name: { type: "string", errorMessage: "Name must be of string type" },
        email: { type: "string", format: "email", errorMessage: "Must be a valid email address" },
      },
      required: ["name", "email"],
      additionalProperties: false,
    };
  
    constructor(id, name, email) {
      this.id = id;
      this.name = name;
      this.email = email;
    }
  }
  
  module.exports = User;
  