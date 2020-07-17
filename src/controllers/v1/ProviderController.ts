import { Request, Response, NextFunction } from 'express';
import Provider from '../../models/provider'
import slugify  from 'slugify'

class ProviderController {

    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const providers = await Provider.find({})
            return res.status(200).json({ success: true, data: providers })
        } catch (error) {
            return res.status(500).json({ error: true, message: error.message })
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, providerType } = req.body
            const provider = new Provider({ name, providerType, slug: slugify(name, { lower: true }) })
            await provider.save()
            return res.status(200).json({ success: true, data: provider })
        } catch (error) {
            return res.status(500).json({ error: true, message: error.message })
        }
    }
}

module.exports = new ProviderController()
