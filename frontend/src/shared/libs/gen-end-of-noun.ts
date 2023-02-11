export const genEndOfNoun = (number: number, firstTemp: string, secondTemp: string, thirdRemp: string) => {
	number = Math.abs(number);
	number %= 100;
	if (number >= 5 && number <= 20) {
		return thirdRemp;
	}
	number %= 10;
	if (number === 1) {
		return firstTemp;
	}
	if (number >= 2 && number <= 4) {
		return secondTemp;
	}
	return thirdRemp;
};