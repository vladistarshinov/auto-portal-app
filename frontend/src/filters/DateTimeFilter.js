import moment from "moment";

const DateTimeFilter = (date) => {
  return moment(date).format("DD.MM.YYYY HH:MM");
};

export default DateTimeFilter;
