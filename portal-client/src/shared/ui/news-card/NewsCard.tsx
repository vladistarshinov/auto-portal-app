import { FC } from 'react'
import { styled } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	Collapse,
	IconButton,
	Typography,
	Chip
} from '@mui/material'
import { IconButtonProps } from '@mui/material/IconButton'
import {
	Favorite as FavoriteIcon,
	Share as ShareIcon,
	MoreVert as MoreVertIcon
} from '@mui/icons-material'
import { getStrapiMediaUrl } from '@/shared/configs/strapi-api.config'
import { IArticleContent, IPromotionContent } from '@/shared/api/types/strapi/news.types'
import { convertDate } from '@/shared/libs/date-time-filter'
import { motion } from 'framer-motion'

const NewsCard: FC<{content: IArticleContent | IPromotionContent}> = ({content}) =>  {
	return (
		<motion.div
			layout
			animate={{ opacity: 1, scale: 1 }}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0, scale: 0 }}
		>
			<Card sx={{ maxWidth: 500, height: 400 }}>
				<CardHeader
					avatar={
						<Chip
							sx={{
								border: '1px solid #E2B979',
								color: '#c48e3a',
								fontWeight: 700
							}}
							label={'tags' in content.attributes ? 'Новость' : 'Акция'}
							variant="outlined"
						/>
					}
					title={content.attributes.title}
					subheader={'tags' in content.attributes
						? convertDate(content.attributes.publishedAt)
						: `${convertDate(content.attributes.from)} - ${convertDate(content.attributes.to)}`
					}
				/>
				<CardMedia
					component="img"
					height="194"
					image={getStrapiMediaUrl(content.attributes.image.data!.attributes.url)}
					alt="Paella dish"
				/>
				<CardContent>
					<Typography variant="body2" color="text.secondary">
						{content.attributes.body}
					</Typography>
				</CardContent>
			</Card>
		</motion.div>
	)
}

export default NewsCard