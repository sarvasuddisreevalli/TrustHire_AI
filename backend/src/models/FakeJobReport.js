"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeJobReport = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FakeJobReportSchema = new mongoose_1.default.Schema({
    jobId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Job', required: true },
    reportedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }, // Can be null if flagged by system AI automatically
    reason: { type: String, required: true },
    aiConfidence: { type: Number, default: 0 },
    status: { type: String, enum: ['Pending', 'Removed', 'Safe'], default: 'Pending' }
}, { timestamps: true });
exports.FakeJobReport = mongoose_1.default.model('FakeJobReport', FakeJobReportSchema);
//# sourceMappingURL=FakeJobReport.js.map