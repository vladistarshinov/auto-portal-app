export const convertArrToStr = (res: any[]) =>
	res.filter(r => r.error).map(r => r.title).join(', ')