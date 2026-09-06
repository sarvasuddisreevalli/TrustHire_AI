import mongoose from 'mongoose';
export declare const Application: mongoose.Model<{
    jobId: mongoose.Types.ObjectId;
    candidateId: mongoose.Types.ObjectId;
    resumeText: string;
    atsScore: number;
    atsFeedback?: string | null;
    status: "Accepted" | "Interviewing" | "Pending" | "Rejected" | "Reviewed";
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    jobId: mongoose.Types.ObjectId;
    candidateId: mongoose.Types.ObjectId;
    resumeText: string;
    atsScore: number;
    atsFeedback?: string | null;
    status: "Accepted" | "Interviewing" | "Pending" | "Rejected" | "Reviewed";
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    jobId: mongoose.Types.ObjectId;
    candidateId: mongoose.Types.ObjectId;
    resumeText: string;
    atsScore: number;
    atsFeedback?: string | null;
    status: "Accepted" | "Interviewing" | "Pending" | "Rejected" | "Reviewed";
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
    candidateId: mongoose.Types.ObjectId;
    resumeText: string;
    atsScore: number;
    atsFeedback?: string | null;
    status: "Accepted" | "Interviewing" | "Pending" | "Rejected" | "Reviewed";
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    jobId: mongoose.Types.ObjectId;
    candidateId: mongoose.Types.ObjectId;
    resumeText: string;
    atsScore: number;
    atsFeedback?: string | null;
    status: "Accepted" | "Interviewing" | "Pending" | "Rejected" | "Reviewed";
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    jobId: mongoose.Types.ObjectId;
    candidateId: mongoose.Types.ObjectId;
    resumeText: string;
    atsScore: number;
    atsFeedback?: string | null;
    status: "Accepted" | "Interviewing" | "Pending" | "Rejected" | "Reviewed";
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
    candidateId: mongoose.Types.ObjectId;
    resumeText: string;
    atsScore: number;
    atsFeedback?: string | null;
    status: "Accepted" | "Interviewing" | "Pending" | "Rejected" | "Reviewed";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    jobId: mongoose.Types.ObjectId;
    candidateId: mongoose.Types.ObjectId;
    resumeText: string;
    atsScore: number;
    atsFeedback?: string | null;
    status: "Accepted" | "Interviewing" | "Pending" | "Rejected" | "Reviewed";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Application.d.ts.map