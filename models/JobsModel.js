import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Company name is required"]
    },
    position: {
        type: String,
        required: [true, "Job Position is required"]
    },
    status: {
        type: String,
        enum: ["pending", "reject", "interview", "selected"],
        default: "pending"
    },
    workType: {
        type: String,
        enum: ["full-time", "part-time", "internship", "contract"],
        default: "full-time"
    },
    workLocation: {
        type: String,
        default: "Ahmadabad",
        required: [true, "Work location is required"]
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

export default mongoose.model("Job", jobSchema);