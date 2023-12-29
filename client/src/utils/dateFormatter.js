import moment from 'moment';

export const dateFormattter = (dateToFormat) => {
  const format = 'YYYY-MM-DD';
  const format1 = 'MMMM Do [at] h:mm A';
  const date = moment(dateToFormat).format(format1);
  return date;
};

export function dateFormattterM(date) {
  const inputDate = moment(date).startOf('day');
  const today = moment().startOf('day');
  const yesterday = moment().subtract(1, 'day').startOf('day');

  if (inputDate.isSame(today, 'day')) {
    return `Today at ${moment(date).format('h:mm A')}`;
  } else if (inputDate.isSame(yesterday, 'day')) {
    return `Yesterday at ${moment(date).format('h:mm A')}`;
  } else {
    return moment(date).format('MMMM Do [at] h:mm A');
  }
}

// Example usage:

// export const dateFormattter = (dateToFormat) => {
//     const date = new Date(dateToFormat)
//     const day = date.getDay()
//     const month = date.getMonth()
//     const year = date.getFullYear()
//     let newDay =day;
//     let newMonth = month
//     if (day < 10) {
//         newDay = `0${day}`
//     }
//     if (month < 10) {
//       newMonth = `0${month}`;
//     }
//    const  newDate = newDay + '-' + newMonth + '-' + year
//     return newDate
// }

console.log(dateFormattterM('2021-10-29T20:08:26.894Z'));
console.log(dateFormattterM('2023-07-30T19:23:18.745Z'));
console.log(dateFormattterM('1999-11-04T17:46:58.187Z'));
console.log(dateFormattterM('2022-11-18T17:46:58.187Z'));
console.log(dateFormattterM('2022-11-17'));
const today = moment().startOf('day');
//console.log(today)
