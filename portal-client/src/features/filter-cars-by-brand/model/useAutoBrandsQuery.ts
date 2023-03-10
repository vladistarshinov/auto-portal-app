import { useQuery } from "@tanstack/react-query"
import { AutoBrandService } from "./auto-brand.service"

export const useAutoBrandsQuery = (
	autoBrands: any
) => {
	const { data: { data: brands }, isLoading: isBrandLoading } = useQuery(
		['auto-brands'],
		() =>
			AutoBrandService.getAll(),
		{
			initialData: autoBrands,
			keepPreviousData: true
		}
	)

	return { brands, isBrandLoading }
}