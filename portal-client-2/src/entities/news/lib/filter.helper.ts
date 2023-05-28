export interface IFilterHelper {
	title: string,
	slug: 'all' | 'news' | 'promotions'
}

export const filterHelper: IFilterHelper[] = [
	{
		title: 'Все',
		slug: 'all'
	},
	{
		title: 'Новости',
		slug: 'news'
	},
	{
		title: 'Акции',
		slug: 'promotions'
	}
]