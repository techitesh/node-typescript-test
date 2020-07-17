import { model, Schema } from 'mongoose'
import { IProductDocument, IProductModel } from '../interfaces/IProductInterface'

const ProductSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    provider: {
        type: Schema.Types.ObjectId,
        ref: "Provider"
    },
    variation: {
        type: String,
        default: null
    },
    price: {
        type: Number,
        default: 0
    }
},{ timestamps: true })

ProductSchema.index({ name: 1, provider: 1, variation: 1 }, { unique: true })

const ProductModel: IProductModel = model<IProductDocument, IProductModel>("Product", ProductSchema)

export default ProductModel
