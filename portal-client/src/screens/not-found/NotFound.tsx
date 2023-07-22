import { FC } from 'react'
import { Box, styled, Typography } from '@mui/material'
import NotFoundSvg from '@/shared/ui/icons/NotFoundSvg';

const NotFoundScreen: FC = () => {
	const Wrapper = styled(Box)({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		gap: 3,
		marginTop: '100px'
	})

	const ImgWrapper = styled(Box)({
		width: '130px'
	})

	const Title = styled(Typography)({
		fontWeight: 400,
		fontSize: '16px',
		lineHeight: '18px',
		color: '#A1A5B7',
		flex: 'none',
		order: 2,
		flexGrow: 0
	})

	const Desc = styled(Typography)({
		fontWeight: 800,
		fontSize: '26px',
		lineHeight: '40px',
		color: '#50546B',
		flex: 'none',
		order: 2,
		flexGrow: 0
	})

	const Desc2 = styled(Typography)({
		fontWeight: 400,
		fontSize: '14px',
		lineHeight: '18px',
		color: '#50546B',
		flex: 'none',
		order: 3,
		flexGrow: 0
	})

	return (
		<Wrapper>
			<ImgWrapper>
				<NotFoundSvg />
			</ImgWrapper>
			<Title>Ошибка 404</Title>
			<Desc>Извините, страница не найдена</Desc>
			<Desc2>Попробуйте ввести другой запрос</Desc2>
		</Wrapper>
	)
}

export default NotFoundScreen