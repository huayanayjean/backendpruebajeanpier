// Entidad Categories.

class Category {
  static schema = {
      type: "object",
      properties: {
          name: { type: "string", errorMessage: "Name must be of string type" },
      },
      required: ["name"],
      additionalProperties: false,
  };

  constructor(id, name) {
      this.id = id;
      this.name = name;
  }
}

module.exports = Category;