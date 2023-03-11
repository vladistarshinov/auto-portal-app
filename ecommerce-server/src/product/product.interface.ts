import { Meta } from "common/types/meta.interface"
import { Types } from "mongoose"
import {Product, ProductDocument } from "./schema/product.schema"

export class AllProductResponse extends Meta {
    data: (Product & Required<{_id: Types.ObjectId}>)[]
}