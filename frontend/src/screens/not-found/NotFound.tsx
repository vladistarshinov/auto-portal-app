import { FC } from 'react'
import { Box, styled, Typography } from '@mui/material'

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
				<svg width="129" height="128" viewBox="0 0 129 128" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M66.4938 10.799C51.2938 6.39895 34.4938 9.99895 22.4938 21.999C5.29375 39.199 5.29375 67.599 22.4938 84.799C39.6938 101.999 68.0938 101.999 85.2938 84.799C88.4938 81.599 91.2937 77.599 93.6937 73.599" stroke="#777B92" stroke-width="8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M85.6875 85.1992L119.288 118.799" stroke="#777B92" stroke-width="8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M93.7 11.5977L78.5 34.3977H98.5L85.3 54.7977" stroke="#777B92" stroke-width="8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</ImgWrapper>
			<Title>Ошибка 404</Title>
			<Desc>Извините, страница не найдена</Desc>
			<Desc2>Попробуйте ввести другой запрос</Desc2>
		</Wrapper>
	)
}

export default NotFoundScreen