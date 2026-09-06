import mongoose from 'mongoose';
export declare const Job: mongoose.Model<{
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    requirements: string[];
    recruiterId: mongoose.Types.ObjectId;
    status: "Active" | "Closed";
    applicantsCount: number;
    scamScore: number;
    scamFlags: string[];
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    requirements: string[];
    recruiterId: mongoose.Types.ObjectId;
    status: "Active" | "Closed";
    applicantsCount: number;
    scamScore: number;
    scamFlags: string[];
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    requirements: string[];
    recruiterId: mongoose.Types.ObjectId;
    status: "Active" | "Closed";
    applicantsCount: number;
    scamScore: number;
    scamFlags: string[];
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    requirements: string[];
    recruiterId: mongoose.Types.ObjectId;
    status: "Active" | "Closed";
    applicantsCount: number;
    scamScore: number;
    scamFlags: string[];
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    requirements: string[];
    recruiterId: mongoose.Types.ObjectId;
    status: "Active" | "Closed";
    applicantsCount: number;
    scamScore: number;
    scamFlags: string[];
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    requirements: string[];
    recruiterId: mongoose.Types.ObjectId;
    status: "Active" | "Closed";
    applicantsCount: number;
    scamScore: number;
    scamFlags: string[];
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    requirements: string[];
    recruiterId: mongoose.Types.ObjectId;
    status: "Active" | "Closed";
    applicantsCount: number;
    scamScore: number;
    scamFlags: string[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    requirements: string[];
    recruiterId: mongoose.Types.ObjectId;
    status: "Active" | "Closed";
    applicantsCount: number;
    scamScore: number;
    scamFlags: string[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Job.d.ts.map