"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApplicationSchema = new mongoose_1.default.Schema({
    jobId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Job', required: true },
    candidateId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    resumeText: { type: String, required: true },
    atsScore: { type: Number, default: 0 },
    atsFeedback: { type: String },
    status: { type: String, enum: ['Pending', 'Reviewed', 'Interviewing', 'Rejected', 'Accepted'], default: 'Pending' }
}, { timestamps: true });
exports.Application = mongoose_1.default.model('Application', ApplicationSchema);
//# sourceMappingURL=Application.js.map