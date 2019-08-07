import { Product } from './product.model'
import { User, roles } from '../user/user.model'
import { AuthenticationError } from 'apollo-server'
import mongoose from 'mongoose'

const productsTypeMatcher = {
  GAMING_PC: 'GamingPc',
  BIKE: 'Bike',
  DRONE: 'Drone'
}

const products = () => {
  return Product.find({}).exec()
}

const product = (_, args) => {
  return Product.findById(args.id).exec()
}

const newProduct = (_, args, ctx) => {
  const createdBy = ctx.user
  return Product.create({...args.input, createdBy})
}

const updateProduct = (_, args) => {
  return Product.findByIdAndUpdate(args.id, args.input, {new: true})
}

const removeProduct = (_, args) => {
  return Product.findByIdAndDelete(args.id)
}

const createdBy = (product) => {
  return User.findById(product.createdBy).exec()
}

export default {
  Query: {
    products,
    product
  },
  Mutation: {
    newProduct,
    updateProduct,
    removeProduct
  },
  Product: {
    __resolveType(product) {},
    createdBy
  }
}
