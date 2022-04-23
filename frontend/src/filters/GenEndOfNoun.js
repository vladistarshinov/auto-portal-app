const genEndOfNoun = (number, firstTemp, secondTemp, thirdRemp) => {
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

export { genEndOfNoun };
