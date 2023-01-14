import {Request, Response, Router} from "express";

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRouter = Router({})

productsRouter.get('/', (req: Request, res: Response) => {
    if (req.query.title) {
        const productTitle = req.query.title.toString()
        const filteredProduct = products.filter(p => p.title.includes(productTitle))
        res.send(filteredProduct)
    }
    else res.send(products)
})
productsRouter.get('/:productTitle', (req: Request, res: Response) => {
    const product = products.find(p => p.title === req.params.productTitle)
    if (product) res.send(product)
    else res.send(404)
})
productsRouter.delete('/:id', (req: Request, res: Response) => {
    const index = products.findIndex(p => p.id === +req.params.id)
    if (index > -1) res.send(products.splice(index, 1))
    else res.send(400)
})
productsRouter.post('/', (req: Request, res: Response) => {
    if (req.body) {
        const newProduct = {
            id: +(new Date()),
            title: req.body.title
        }
        products.push(newProduct)
        res.sendStatus(201).send(newProduct)
    }
    else res.send(400)
})
productsRouter.put('/:id', (req: Request, res: Response) => {
    const index = products.findIndex(p => p.id === +req.params.id)
    if (index > -1) {
        products[index].title = req.body.title
        res.sendStatus(201).send(products[index])
    }
    else res.send(400)
})