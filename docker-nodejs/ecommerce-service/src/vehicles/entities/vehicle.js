// Entidad Vehicles.

class Vehicle {
  static schema = {
      type: "object",
      properties: {
          name: { type: "string", errorMessage: "Name must be of string type" },
          identificador: { type: "string", errorMessage: "Identifier must be of string type" },
          capacity_standard: { type: "integer", errorMessage: "Capacity standard must be an integer" },
          capacity_premium: { type: "integer", errorMessage: "Capacity premium must be an integer" },
          category_id: { type: "integer", errorMessage: "Category ID must be an integer" }
      },
      required: ["name", "identificador", "capacity_standard", "capacity_premium", "category_id"],
      additionalProperties: false,
  };

  constructor(id, name, identificador, capacity_standard, capacity_premium, category_id) {
      this.id = id;
      this.name = name;
      this.identificador = identificador;
      this.capacity_standard = capacity_standard;
      this.capacity_premium = capacity_premium;
      this.category_id = category_id;
  }
}

module.exports = Vehicle;