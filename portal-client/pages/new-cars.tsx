import { GetStaticProps, NextPage } from 'next'

import { IProduct, IProductsResponse } from '@/shared/api/types/product.types'
import { ProductService } from '@/entities/product/model/product.service'
import AutoPartsScreen from '@/screens/autoparts/AutoParts'
import { AutoService } from '@/entities/auto/model/auto.service'
import NewCarsScreen from '@/screens/new-cars/NewCarsScreen'
import { AutoBrandService } from '@/features/filter-cars-by-brand/model/auto-brand.service'
import { IAutoResponse } from '@/shared/api/types/auto.types'

interface INewCarsPage {
	cars: IAutoResponse
	autoBrands: string[]
}

const NewCarsPage: NextPage<INewCarsPage> = ({ cars, autoBrands }) => {
	return <NewCarsScreen cars={cars} autoBrands={autoBrands}	/>
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: cars } = await AutoService.getAll(1, 4)
		const { data: autoBrands } = await AutoBrandService.getAll()
		return {
			props: {
				cars,
				autoBrands
			}
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default NewCarsPage