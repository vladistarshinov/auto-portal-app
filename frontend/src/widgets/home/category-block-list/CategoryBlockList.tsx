import { FC } from 'react'
import Image from 'next/image'
import { Box, Card, CardContent, Container } from '@mui/material'

import { IHomeCategoryBlockContent } from '@/shared/api/types/strapi-content.types'

const CategoryBlockList: FC<{homeCategoryBlocks: IHomeCategoryBlockContent[]}> = ({homeCategoryBlocks}) => {
	const mainCategory = homeCategoryBlocks.find((c: IHomeCategoryBlockContent) => c.attributes.isMain)
	const otherCategories = homeCategoryBlocks.filter((c: IHomeCategoryBlockContent) => c.id !== mainCategory?.id)

	return (
		<Container maxWidth="xl">
			<Box display='flex' justifyContent='center' flexWrap='wrap' gap={2} sx={{ mt: 3 }}>
				<Card sx={{ width: '860px', height: '340px' }}>
					<CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
						<Box sx={{ width: '380px', mt: '55px', ml: '55px' }}>
							<h3>{mainCategory?.attributes.title}</h3>
							<p>{mainCategory?.attributes.desc}</p>
						</Box>
						<Box sx={{ width: '445px', height: '220px', position: 'relative' }}>
							<Image
								layout='fill'
								draggable={false}
								priority
								src='/static/card_car.png'
								alt=''
							/>
						</Box>
					</CardContent>
				</Card>
				{otherCategories.map((c: IHomeCategoryBlockContent) => (
					<Card sx={{ width: '420px', height: '340px' }} key={c.id}>
						<CardContent sx={{ margin: '55px 10px' }}>
							<h3>{c.attributes.title}</h3>
							<p>{c.attributes.desc}.</p>
						</CardContent>
					</Card>
				))}
			</Box>
		</Container>
	)
}

export default CategoryBlockList