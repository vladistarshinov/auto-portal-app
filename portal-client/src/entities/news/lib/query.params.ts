import qs from "qs"

export const getPopulateQuery = (populateFilters: string[]) => {
	return qs.stringify(
		{
			populate: [...populateFilters]
		},
		{
			encodeValuesOnly: true,
		}
	)
}

export const getFilterQuery = <T>(filter: [string, T]) => {
	return qs.stringify(
		{
			filters: {
				[`${filter[0]}`]: {
					$eq: [`${filter[1]}`],
				},
			},
		},
		{
			encodeValuesOnly: true,
		}
	)
}

export const getFilterPopulateQuery = <T>(filter: [string, T], populateFilters: string[]) => {
	return qs.stringify(
		{
			filters: {
				[`${filter[0]}`]: {
					$eq: [`${filter[1]}`],
				},
			},
			populate: [...populateFilters]
		},
		{
			encodeValuesOnly: true,
		}
	)
}
