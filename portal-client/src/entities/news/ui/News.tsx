import { FC, useState } from 'react'

import { Box, Button, ButtonGroup } from '@mui/material'
import NewsCard from '@/shared/ui/news-card/NewsCard'
import { filterHelper, IFilterHelper } from '../lib/filter.helper'
import { IArticleContent, IPromotionContent } from '@/shared/api/types/strapi/news.types'

interface INews {
	articles: IArticleContent[]
	promotions: IPromotionContent[]
}

const News: FC<INews> = ({articles, promotions}) => {
	const [filter, setFilter] = useState<'all' | 'news' | 'promotions'>('all')
	const content: (IArticleContent | IPromotionContent)[] = [...articles, ...promotions]

	return (
		<Box display='flex' flexDirection='column'>
			<ButtonGroup variant="outlined" aria-label="outlined button group">
				{filterHelper.map((f: IFilterHelper) => (
					<Button
							key={f.slug}
							onClick={() => setFilter(f.slug)}
							sx={{
								border: '1px solid #E2B979',
								color: filter === f.slug
									? '#000'
									: '#6e6c6c',
								backgroundColor: filter === f.slug
									? '#E2B979'
									: 'transparent',
								'&:hover': {
									border: '1px solid #E2B979',
								},
								'&:active': {
									border: '1px solid #E2B979',
									backgroundColor: filter === f.slug
									? '#E2B979'
									: 'transparent',
								}
							}}
					>{f.title}</Button>
				))}
			</ButtonGroup>
			<Box mt={4} display='inline-flex' alignItems='center' gap={3}>
				{filter === 'all' && content.map((data: IArticleContent | IPromotionContent) => (
					<NewsCard key={data.attributes.slug} content={data} />
				))}
				{filter === 'news' && articles.map((data: IArticleContent) => (
					<NewsCard key={data.attributes.slug} content={data} />
				))}
				{filter === 'promotions' && promotions.map((data: IPromotionContent) => (
					<NewsCard key={data.attributes.slug} content={data} />
				))}
			</Box>
		</Box>
	)
}

export default News