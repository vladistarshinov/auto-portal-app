import { FC } from "react"
import { Box, Container, Typography } from "@mui/material"

import News from "@/entities/news/ui/News"
import BreadCrumbs from "@/shared/ui/breadcrumbs/Breadcrumbs"
import { IArticleContent, IPromotionContent } from "@/shared/api/types/strapi/news.types"

interface INewsScreen {
	articles: IArticleContent[]
	promotions: IPromotionContent[]
}

const NewsScreen: FC<INewsScreen> = ({articles, promotions}) => {
	return (
		<Container maxWidth="xl">
			<BreadCrumbs
				navElements={[{ title: "Главная", url: "/" }, { title: "Новости и акции" }]}
			/>
			<Typography variant="h4" sx={{ paddingY: '1rem' }}>
				Новости и акции
			</Typography>
			<News articles={articles} promotions={promotions} />
		</Container>
	)
}

export default NewsScreen