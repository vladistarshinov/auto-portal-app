import { ChangeEvent, FC, useState } from 'react'
import { Checkbox, Container, FormControlLabel, FormGroup } from '@mui/material'

import { IProduct, IProductsResponse } from '@/shared/api/types/product.types'
import ProductList from '@/widgets/product-list/ProductList'
import TopProducts from '@/widgets/top-products/TopProducts'
import BreadCrumbs from '@/shared/ui/breadcrumbs/Breadcrumbs'

interface IAutoPartsScreen {
	products: IProductsResponse
	topProducts: IProduct[]
}

const AutoPartsScreen: FC<IAutoPartsScreen> = ({products, topProducts}) => {
	const [checked, setChecked] = useState(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked)
	}

	return (
		<Container maxWidth="xl" sx={{mt: '2rem'}}>
			<BreadCrumbs
				navElements={[{ title: "Главная", url: "/" }, { title: "Каталог автозапчастей" }]}
			/>
			<FormGroup>
				<FormControlLabel
					control={
						<Checkbox
							checked={checked}
							onChange={handleChange}
						/>
					}
					label="Показать топ популярных"
				/>
			</FormGroup>
			{checked && <TopProducts products={topProducts} />}
			<ProductList products={products}/>
		</Container>
	)
}

export default AutoPartsScreen