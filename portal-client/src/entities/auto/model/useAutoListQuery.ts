import { IAutoResponse } from "@/shared/api/types/auto.types";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { AutoService } from "./auto.service";
import { EnumAutoSort } from "./auto.types";
import { FiltersDto } from "./filters.dto";

export const useAutoListQuery = (
	page: number,
	limit: number,
	searchTerm: string,
	sortType: EnumAutoSort,
	filters: FiltersDto | undefined,
	cars: IAutoResponse
) => {
	const { data: autoList, isLoading } = useQuery(
		['autos', page, limit, sortType, searchTerm, filters],
		() =>
			AutoService.getAll(page, limit, searchTerm, sortType, filters),
		{
			initialData: cars,
			keepPreviousData: true,
		}
	)

	return useMemo(
		() => ({ autoList, isLoading }),
		[page, limit, searchTerm, sortType, filters]
	)
}