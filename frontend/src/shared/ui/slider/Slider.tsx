import { FC, useState } from 'react'
import { Box, Button, Typography } from "@mui/material"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import { getStrapiMediaUrl } from "@/shared/configs/strapi-api.config"
import { IArticleContent, IPromotionContent, ITagContent } from "@/shared/api/types/strapi/news.types"

interface ITopNews {
	topArticles: IArticleContent[]
	topPromotions: IPromotionContent[]
}

const Slider: FC<ITopNews> = ({topArticles, topPromotions}) => {
	const [slide, setSlide] = useState(0)
	const [fadeState, setFadeState] = useState<'fade-in' | 'fade-out'>('fade-in')
	const [currentTimer, setCurrentTimer] = useState<NodeJS.Timeout>()

	const topContent: (IArticleContent | IPromotionContent | any)[] = [...topArticles, ...topPromotions]

	const handleClick = (move: number) => {
		const timer = setTimeout(() => {
			setSlide((s) => s + move)
			setFadeState('fade-in')
		}, 300)
		clearTimeout(currentTimer!)
		setFadeState('fade-out')
		setCurrentTimer(timer)
	}

	return (
		<Box
			sx={{
				display: 'flex',
				background: '#E2B979',
				maxWidth: '1000px',
				height: '400px',
				width: '100%',
				position: 'relative',
				borderRadius: '8px',
				margin: '20px',
				overflow: 'hidden',
		}}>
			<Box
				sx={{
					display: 'flex',
					width: '100%',
					height: '100%',
					opacity: fadeState === 'fade-in' ? 1 : 0,
					transitionDuration: '.3s'
			}}>
				<Box sx={{
					flex: 1,
					padding: '0 100px',
					width: '50%',
					justifyContent: 'center',
					display: 'flex',
					flexDirection: 'column'
				}}>
					<Box
						sx={{
							fontWeight: 700,
							color: 'white',
							fontSize: '24px',
							lineHeight: '140%'
						}}>{topContent[slide].attributes.title}</Box>
					{topContent[slide].attributes.tag && (
							<Typography
									sx={{
										color: 'white',
										fontSize: '14px',
										lineHeight: '140%'
									}}
							>#{topContent[slide].attributes.tag.data.attributes.title}</Typography>
					)}
					{topContent[slide].attributes.tags && (
						<Box display='inline-flex' alignItems='center'>
							{topContent[slide].attributes.tags.data.map((tag: ITagContent) => (
								<Typography
									sx={{
										color: 'white',
										fontSize: '14px',
										lineHeight: '140%'
									}}
								>#{tag.attributes.title}</Typography>
							))}
						</Box>
					)}
					<Box sx={{
						wordWrap: 'break-word',
						fontWeight: 700,
						color: 'white',
						fontSize: '18px',
						lineHeight: '140%',
						marginTop: '34px',
					}}>{topContent[slide].attributes.body}</Box>
				</Box>
				<Box sx={{
					backgroundImage: `url(${getStrapiMediaUrl(topContent[slide]?.attributes?.image?.data.attributes.url)})`,
					width: '50%',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					opacity: '.9'
				}}></Box>
			</Box>
			{slide > 0 && (
				<Button
					sx={{
						left: '15px',
						top: 'calc(50% - 20px)',
						background: 'rgba(0, 0, 0, .2)',
						minWidth: '40px',
						height: '40px',
						borderRadius: '50%',
						color: 'white',
						position: 'absolute',
						'&:hover': {
							background: 'rgba(0, 0, 0, .5)',
						}
					}}
					onClick={() => handleClick(-1)}
				>
					<ArrowBackIosNewIcon />
				</Button>
			)}
			{slide < topContent.length - 1 && (
				<Button
					sx={{
						right: '15px',
						top: 'calc(50% - 20px)',
						background: 'rgba(0, 0, 0, .3)',
						minWidth: '40px',
						height: '40px',
						borderRadius: '50%',
						color: 'white',
						position: 'absolute',
						'&:hover': {
							background: 'rgba(0, 0, 0, .5)',
						}
					}}
					onClick={() => handleClick(1)}
				>
					<ArrowForwardIosIcon />
				</Button>
			)}
		</Box>
	)
}

export default Slider