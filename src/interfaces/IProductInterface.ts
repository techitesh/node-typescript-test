import { Document, Model } from "mongoose";
import { ObjectID } from "bson";

export interface IProductDocument  extends Document {
    _id: ObjectID;
    name: string;
    provider: ObjectID;
    variation: string;
    price: Number;
}
export interface IProductModel extends Model<IProductDocument> { }
