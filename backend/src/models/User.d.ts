import mongoose from 'mongoose';
export declare const User: mongoose.Model<{
    fullName: string;
    email: string;
    password: string;
    role: "admin" | "recruiter" | "user";
    isVerifiedRecruiter: boolean;
    companyName?: string | null;
    companyWebsite?: string | null;
    employeeId?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    fullName: string;
    email: string;
    password: string;
    role: "admin" | "recruiter" | "user";
    isVerifiedRecruiter: boolean;
    companyName?: string | null;
    companyWebsite?: string | null;
    employeeId?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    fullName: string;
    email: string;
    password: string;
    role: "admin" | "recruiter" | "user";
    isVerifiedRecruiter: boolean;
    companyName?: string | null;
    companyWebsite?: string | null;
    employeeId?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    fullName: string;
    email: string;
    password: string;
    role: "admin" | "recruiter" | "user";
    isVerifiedRecruiter: boolean;
    companyName?: string | null;
    companyWebsite?: string | null;
    employeeId?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    fullName: string;
    email: string;
    password: string;
    role: "admin" | "recruiter" | "user";
    isVerifiedRecruiter: boolean;
    companyName?: string | null;
    companyWebsite?: string | null;
    employeeId?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    fullName: string;
    email: string;
    password: string;
    role: "admin" | "recruiter" | "user";
    isVerifiedRecruiter: boolean;
    companyName?: string | null;
    companyWebsite?: string | null;
    employeeId?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    fullName: string;
    email: string;
    password: string;
    role: "admin" | "recruiter" | "user";
    isVerifiedRecruiter: boolean;
    companyName?: string | null;
    companyWebsite?: string | null;
    employeeId?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    fullName: string;
    email: string;
    password: string;
    role: "admin" | "recruiter" | "user";
    isVerifiedRecruiter: boolean;
    companyName?: string | null;
    companyWebsite?: string | null;
    employeeId?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=User.d.ts.map