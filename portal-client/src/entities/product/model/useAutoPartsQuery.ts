import { useMemo } from 'react'
import { useQuery } from "@tanstack/react-query"

import { EnumAutoSort } from "@/entities/auto/model/auto.types"
import { IProductsResponse } from "@/shared/api/types/product.types"
import { ProductService } from "./product.service"

export const useAutoPartsQuery = (
	page: number,
	limit: number,
	searchTerm: string,
	sortType: EnumAutoSort,
	filters: any | undefined,
	data: IProductsResponse
) => {
	const { data: productList, isLoading } = useQuery(
		['autoparts', page, limit, sortType, searchTerm, filters],
		() =>
			ProductService.getAll(page, limit, searchTerm, sortType, filters),
		{
			initialData: data,
			keepPreviousData: true,
		}
	)

	return useMemo(
		() => ({ productList, isLoading }),
		[page, limit, searchTerm, sortType, filters]
	)
}