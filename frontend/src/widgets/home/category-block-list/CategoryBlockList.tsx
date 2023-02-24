import { FC } from 'react'
import Image from 'next/image'
import { Box, Card, CardContent, Container } from '@mui/material'

import { IHomeCategoryBlockContent } from '@/shared/api/types/strapi-content.types'
import { getStrapiMediaUrl } from '@/shared/configs/strapi-api.config'

const CategoryBlockList: FC<{content: IHomeCategoryBlockContent[]}> = ({content}) => {
	const mainCategory = content.find((c: IHomeCategoryBlockContent) => c.attributes.isMain)
	const otherCategories = content.filter((c: IHomeCategoryBlockContent) => c.id !== mainCategory?.id)

	return (
		<Container maxWidth="xl">
			<Box
				display='flex'
				justifyContent='center'
				flexWrap='wrap'
				gap={2}
				sx={{ mt: 3 }}
			>
				<Card sx={{ width: '860px', height: '340px' }}>
					<CardContent
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'flex-end'
						}}
					>
						<Box sx={{ width: '380px', mt: '55px', ml: '55px' }}>
							<h3>{mainCategory?.attributes.title}</h3>
							<Box sx={{
								width: "5rem",
								height: "0.25rem",
								marginBottom: "1.25rem",
								background: "#E2B979",
								marginLeft: "auto",
								marginRight: "auto"
							}}></Box>
							<p>{mainCategory?.attributes.desc}</p>
						</Box>
						<Box
							component="img"
							sx={{
								ml: 5,
								height: 200,
								maxWidth: 300,
								width: "100%",
							}}
							draggable="false"
							src={getStrapiMediaUrl(mainCategory!.attributes.media.data.attributes.url)}
							alt=''
						/>
					</CardContent>
				</Card>
				{otherCategories.map((c: IHomeCategoryBlockContent) => (
					<Card sx={{ width: '420px', height: '340px' }} key={c.id}>
						<CardContent
							sx={{
								margin: '55px 20px',
								display: 'flex',
								alignItems: 'center',
								flexDirection: 'column'
							}}
						>
							<h3>{c.attributes.title}</h3>
							<Box sx={{
								width: "5rem",
								height: "0.25rem",
								marginBottom: "1.25rem",
								background: "#E2B979",
								marginLeft: "auto",
								marginRight: "auto"
							}}></Box>
							<p>{c.attributes.desc}.</p>
						</CardContent>
					</Card>
				))}
			</Box>
		</Container>
	)
}

export default CategoryBlockList