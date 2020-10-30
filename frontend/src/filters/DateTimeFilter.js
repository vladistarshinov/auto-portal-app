import moment from "moment";

const DateTimeFilter = (date) => {
  return moment(date).format("DD.MM.YYYY HH:MM");
};

const DateFilter = (date) => {
  return moment(date).format("DD.MM.YY");
};

export { DateTimeFilter, DateFilter };
