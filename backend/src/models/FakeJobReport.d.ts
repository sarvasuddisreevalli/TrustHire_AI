import mongoose from 'mongoose';
export declare const FakeJobReport: mongoose.Model<{
    jobId: mongoose.Types.ObjectId;
    reportedBy?: mongoose.Types.ObjectId | null;
    reason: string;
    aiConfidence: number;
    status: "Pending" | "Removed" | "Safe";
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    jobId: mongoose.Types.ObjectId;
    reportedBy?: mongoose.Types.ObjectId | null;
    reason: string;
    aiConfidence: number;
    status: "Pending" | "Removed" | "Safe";
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    jobId: mongoose.Types.ObjectId;
    reportedBy?: mongoose.Types.ObjectId | null;
    reason: string;
    aiConfidence: number;
    status: "Pending" | "Removed" | "Safe";
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    jobId: mongoose.Types.ObjectId;
    reportedBy?: mongoose.Types.ObjectId | null;
    reason: string;
    aiConfidence: number;
    status: "Pending" | "Removed" | "Safe";
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    jobId: mongoose.Types.ObjectId;
    reportedBy?: mongoose.Types.ObjectId | null;
    reason: string;
    aiConfidence: number;
    status: "Pending" | "Removed" | "Safe";
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    jobId: mongoose.Types.ObjectId;
    reportedBy?: mongoose.Types.ObjectId | null;
    reason: string;
    aiConfidence: number;
    status: "Pending" | "Removed" | "Safe";
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    jobId: mongoose.Types.ObjectId;
    reportedBy?: mongoose.Types.ObjectId | null;
    reason: string;
    aiConfidence: number;
    status: "Pending" | "Removed" | "Safe";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    jobId: mongoose.Types.ObjectId;
    reportedBy?: mongoose.Types.ObjectId | null;
    reason: string;
    aiConfidence: number;
    status: "Pending" | "Removed" | "Safe";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=FakeJobReport.d.ts.map