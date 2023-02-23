import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import Box from "@mui/material/Box"

import Slider from "@/shared/ui/slider/Slider"
import Carousel from "@/shared/ui/carousel/Carousel"
import Heading from "@/shared/ui/heading/Heading"
import { IProduct } from '@/shared/api/types/product.types'
import { IArticleContent, IPromotionContent } from "@/shared/api/types/strapi/news.types"

interface ITopNews {
	topArticles: IArticleContent[]
	topPromotions: IPromotionContent[]
}

const TopNewsCarousel: FC<ITopNews> = ({topArticles, topPromotions}) => {
	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: '1rem' }}>
				<Heading title='Новости и акции'></Heading>
			</Box>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<Slider key={Date.now()} topArticles={topArticles} topPromotions={topPromotions} />
			</Box>
		</>
	)
}

export default TopNewsCarousel