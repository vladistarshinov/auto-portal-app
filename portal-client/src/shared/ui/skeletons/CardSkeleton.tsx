import { Box, Skeleton } from "@mui/material"

const CardSkeleton = () => {
	return (
		<Box
			my={3}
			display='flex'
			alignItems='center'
			justifyContent='center'
			gap={4}
		>
			{Array
				.from(new Array(4))
				.map((_, idx) => (
					<Skeleton
						key={idx}
						variant='rectangular'
						width={450}
						height={300}
					/>
				))}
		</Box>
	)
}

export default CardSkeleton