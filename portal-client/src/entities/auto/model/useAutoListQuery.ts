import { useQuery } from "@tanstack/react-query";
import { AutoService } from "./auto.service";
import { EnumAutoSort } from "./auto.types";
import { FiltersDto } from "./filters.dto";

export const useAutoListQuery = (
	page: number,
	limit: number,
	searchTerm: string,
	sortType: EnumAutoSort,
	filters: FiltersDto,
	cars: any
) => {
	const { data: { data: autoList }, isLoading } = useQuery(
		['autos', page, limit, sortType, filters],
		() =>
			AutoService.getAll(page, limit, searchTerm, sortType, filters),
		{
			initialData: cars,
			keepPreviousData: true
		}
	)

	return { autoList, isLoading }
}