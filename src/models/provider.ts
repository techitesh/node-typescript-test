import { Schema, model } from "mongoose";
import { IProviderDocument, IProviderModel } from "../interfaces/IProviderInterface";

const ProviderSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true
    },
    providerType: {
        type: String,
        enum: ['broadband', 'energy'],
        default: 'broadband'
    },
    isActive: {
        type: Boolean,
        default: true
    }
},{ timestamps: true })

ProviderSchema.index({ name: 1, providerType: 1 }, { unique: true })


const ProviderModel: IProviderModel = model<IProviderDocument, IProviderModel>(
    "Provider",
    ProviderSchema
);

export default ProviderModel


