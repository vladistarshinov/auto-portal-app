import { GetStaticProps, NextPage } from 'next'

import { IProduct, IProductsResponse } from '@/shared/api/types/product.types'
import { ProductService } from '@/entities/product/model/product.service'
import AutoPartsScreen from '@/screens/autoparts/AutoParts'
import { AutoService } from '@/entities/auto/model/auto.service'
import NewCarsScreen from '@/screens/new-cars/NewCarsScreen'

interface INewCarsPage {
	cars: any
}

const NewCarsPage: NextPage<INewCarsPage> = ({ cars }) => {
	return <NewCarsScreen cars={cars}	/>
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: cars } = await AutoService.getAll(1, 4)
		return {
			props: {
				cars,
			}
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default NewCarsPage