// Entidad Price.

class Price {
    static schema = {
        type: "object",
        properties: {
            coverage_id: { type: "integer", errorMessage: "Coverage ID must be an integer" },
            valid_from: { type: "string", format: "date", errorMessage: "Valid from must be a valid date" },
            valid_to: { type: "string", format: "date", errorMessage: "Valid to must be a valid date" },
            amount: { type: "number", errorMessage: "Amount must be a number" },
        },
        required: ["coverage_id", "valid_from", "valid_to", "amount"],
        additionalProperties: false,
    };
  
    constructor(id, coverage_id, valid_from, valid_to, amount) {
        this.id = id;
        this.coverage_id = coverage_id;
        this.valid_from = valid_from;
        this.valid_to = valid_to;
        this.amount = amount;
    }
  }
  
  module.exports = Price;
  