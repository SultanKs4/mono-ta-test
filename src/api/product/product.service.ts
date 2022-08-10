import HttpException from "../../utils/httpException"
import productModel from "./product.model"
import { ProductRequest } from "./product.type"

export async function getAllProduct(page: number = 0, deleted: boolean) {
    try {
        let limit = 10
        // const countProduct = await productModel.estimatedDocumentCount()
        let product = []
        if (deleted) {
            product = await productModel
                .findDeleted({}, null, {
                    skip: page * limit,
                    limit: limit,
                })
                .select("name category image_url color price")
                .exec()
        } else {
            product = await productModel
                .find({}, null, {
                    skip: page * limit,
                    limit: limit,
                })
                .select("name category image_url color price")
                .exec()
        }
        if (product.length == 0) {
            throw new HttpException(404, "this page don't have data")
        }
        // const responseObject = { list: , totalProduct: countProduct }
        return product
    } catch (error: any) {
        throw error
    }
}

export async function getDetailProduct(id: string) {
    try {
        const product = await productModel.findOneWithDeleted({ _id: id }).exec()
        if (!product) {
            throw new HttpException(404, "product with id not found")
        }
        return product
    } catch (error: any) {
        throw error
    }
}

export async function storeProduct(product: ProductRequest) {
    try {
        const existProduct = await productModel.findOneWithDeleted({
            name: product.name,
            category: product.category,
            color: product.color,
            size: product.size,
        })
        if (existProduct) {
            throw new HttpException(409, "Product already exist")
        }
        return await productModel.create(product)
    } catch (error: any) {
        throw error
    }
}

export async function updateProduct(id: string, product: ProductRequest) {
    try {
        const newProduct = await productModel.findByIdAndUpdate(id, product, { new: true })
        if (!newProduct) {
            throw new HttpException(400, "Product not found")
        }
        return newProduct
    } catch (error: any) {
        throw error
    }
}

export async function deleteProduct(id: string) {
    try {
        const product = await productModel.findOne({ _id: id }).exec()
        if (!product) {
            throw new HttpException(404, "Product not found or already deleted")
        }
        await product.delete()
        return product.deleted
    } catch (error: any) {
        throw error
    }
}

export async function restoreProduct(id: string) {
    try {
        const product = await productModel.findOneDeleted({ _id: id }).exec()
        if (!product) {
            throw new HttpException(404, "Product not found or already restored")
        }
        await product.restore()
        return product
    } catch (error: any) {
        throw error
    }
}
