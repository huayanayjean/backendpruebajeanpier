// Entidad Quotation.

class Quotation {
    static schema = {
        type: "object",
        properties: {
            user_id: { type: "integer", errorMessage: "User ID must be of integer type" },
            coverage_id: { type: "integer", errorMessage: "Coverage ID must be of integer type" },
            category_id: { type: "integer", errorMessage: "Category ID must be of integer type" },
            travel_date: { type: "string", format: "date", errorMessage: "Travel Date must be a valid date" },
            passenger_count: { type: "integer", errorMessage: "Passenger Count must be an integer" },
            status: {
                type: "string",
                enum: ["creada", "reserva", "reserva cancelada"],
                errorMessage: {
                    enum: "Status must be one of 'creada', 'reserva', or 'reserva cancelada'"
                }
            }
        },
        required: [
            "user_id",
            "coverage_id",
            "category_id",
            "travel_date",
            "passenger_count",
            "status"
        ],
        additionalProperties: false,
    };

    constructor(id, user_id, coverage_id, category_id, travel_date, passenger_count, status) {
        this.id = id;
        this.user_id = user_id;
        this.coverage_id = coverage_id;
        this.category_id = category_id;
        this.travel_date = travel_date;
        this.passenger_count = passenger_count;
        this.status = status;
    }
}

module.exports = Quotation;
