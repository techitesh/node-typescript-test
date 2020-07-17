import { Request, Response, NextFunction }  from 'express'
import Product from '../../models/product'
import Provider from '../../models/provider'

class ProductsController {

    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const condition = {}
            if(req.query.provider)  {
                const provider = await Provider.findOne({ slug: req.query.provider }).select({ _id: 1 })
                Object.assign(condition,{ provider: provider._id })
            }
            const products = await Product.find(condition)
            return res.status(200).json({ success: true, data: products })
        } catch (error) {
            return res.status(500).json({ error: true, message: error.message })
        }
    }

    async create(req:Request, res: Response, next: NextFunction) {
        try {
            const { name, provider, variation, price  } = req.body
            const product = new Product({ name, provider, variation, price })
            await product.save()
            return res.status(200).json({ success: true, data: product })
        } catch (error) {
            return res.status(500).json({ error: true, message: error.message })
        }
    }

    async update(req, res, next) {
        try {
            const { name, provider, variation, price  } = req.body
            const product = await Product.findOneAndUpdate(
                    { _id: req.params.id },
                    { name, provider, variation, price },
                    { upsert: true, new: true }
                )
            return res.status(200).json({ success: true, data: product })
        } catch (error) {
            return res.status(500).json({ error: true, message: error.message })
        }
    }
}

module.exports = new ProductsController();
