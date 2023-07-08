import { FC } from "react"
import { Box, Card, CardContent, Container, Grid, Link, Typography } from "@mui/material"
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

import Heading from "@/shared/ui/heading/Heading"
import { getStrapiMediaUrl } from "@/shared/configs/strapi-api.config"
import {
	IHomeServiceBlock,
	IHomeServiceBlockContent
} from "@/shared/api/types/strapi/home-service-block.types"

const ServiceBlockList: FC<{content: IHomeServiceBlockContent}> = ({content}) => {
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					mt: '5rem'
				}}
			>
				<Heading title='Сервисное обслуживание'></Heading>
			</Box>
			<Container maxWidth="xl">
				<Box
					sx={{
						display: 'inline-flex',
						justifyContent: 'center',
						width: '100%'
					}}
				>
					<Box
						sx={{
							width: "70%",
							display: 'flex',
							flexDirection: 'column'
						}}
					>
						<Typography>{content.attributes.description}</Typography>
						<Box
							display={'inline-flex'}
							alignItems={'center'}
							sx={{ gap: 2, mt: 3 }}
						>
							{content.attributes.services.map((service: IHomeServiceBlock) => (
								<Card
									sx={{
										width: '320px',
										height: '340px',
										backgroundColor: '#F9F9F9'
									}}
								>
									<CardContent
										sx={{
											margin: '15px 20px',
											display: 'flex',
											alignItems: 'center',
											flexDirection: 'column'
										}}
									>
										<h3>{service.title}</h3>
										<p>{service.desc}</p>
										<Link
											sx={{
												display: 'inline-flex',
												alignItems: 'center',
												textDecoration: 'none',
												color: '#79726c'
											}}
											href={service.url}
										>
											<Typography>Подробнее</Typography>
											<NavigateNextIcon />
										</Link>
									</CardContent>
								</Card>
							))}
						</Box>
					</Box>
					<Box
						component="img"
						sx={{
							ml: 5,
							height: content.attributes.image.data!.attributes.height,
							maxWidth: 300,
							width: content.attributes.image.data!.attributes.width,
						}}
						draggable="false"
						src={getStrapiMediaUrl(content.attributes.image.data!.attributes.url)}
						alt=''
					/>
				</Box>
			</Container>
		</>
	)
}

export default ServiceBlockList