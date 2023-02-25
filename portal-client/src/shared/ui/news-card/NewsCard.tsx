import { FC } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { getStrapiMediaUrl } from '@/shared/configs/strapi-api.config'
import { Chip } from '@mui/material'
import { IArticleContent, IPromotionContent } from '@/shared/api/types/strapi/news.types'
import { convertDate } from '@/shared/libs/date-time-filter'

const NewsCard: FC<{content: IArticleContent | IPromotionContent}> = ({content}) =>  {
	return (
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
				subheader={'tags' in content.attributes ? convertDate(content.attributes.publishedAt) : `${convertDate(content.attributes.from)} - ${convertDate(content.attributes.to)}`}
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
	)
}

export default NewsCard