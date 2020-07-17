import { Document, Model } from "mongoose";
import { ObjectID } from "bson";

export interface IProviderDocument  extends Document {
    _id: ObjectID;
    name: string;
    slug: any;
    createdAt: any;
    updatedAt: any;
}
export interface IProviderModel extends Model<IProviderDocument> { }
