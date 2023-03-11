import { EnumAutoSort } from "@/entities/auto/model/auto.types"
import { IProductsResponse } from "@/shared/api/types/product.types"
import { useQuery } from "@tanstack/react-query"
import { ProductService } from "./product.service"

export const useAutoPartsQuery = (
	page: number,
	limit: number,
	searchTerm: string,
	sortType: EnumAutoSort,
	filters: any | undefined,
	products: IProductsResponse | any
) => {
	const { data: { data: productList }, isLoading } = useQuery(
		['autoparts', page, limit, sortType, filters],
		() =>
			ProductService.getAll(page, limit, searchTerm, sortType, filters),
		{
			initialData: products,
			keepPreviousData: true
		}
	)

	return { productList, isLoading }
}