// Entidad Coverage.

class Coverage {
    static schema = {
        type: "object",
        properties: {
            origin_place_id: { type: "integer", errorMessage: "Origin Place ID must be of integer type" },
            destination_place_id: { type: "integer", errorMessage: "Destination Place ID must be of integer type" },
            provider_id: { type: "integer", errorMessage: "Provider ID must be of integer type" },
            vehicle_id: { type: "integer", errorMessage: "Vehicle ID must be of integer type" },
            start_time: { type: "string", format: "date-time", errorMessage: "Start Time must be a valid date-time string" },
            duration_hours: { type: "integer", errorMessage: "Duration Hours must be of integer type" }
        },
        required: [
            "origin_place_id",
            "destination_place_id",
            "provider_id",
            "vehicle_id",
            "start_time",
            "duration_hours"
        ],
        additionalProperties: false,
    };

    constructor(id, origin_place_id, destination_place_id, provider_id, vehicle_id, start_time, duration_hours) {
        this.id = id;
        this.origin_place_id = origin_place_id;
        this.destination_place_id = destination_place_id;
        this.provider_id = provider_id;
        this.vehicle_id = vehicle_id;
        this.start_time = start_time;
        this.duration_hours = duration_hours;
    }
}

module.exports = Coverage;
