export const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function getYearsOptions() {
  const currentYear = new Date().getFullYear();
  console.log(currentYear);
  const yearsArr = [];
  for (let i = 0; i < 10; i++) {
    yearsArr.push(+currentYear - i);
  }
  return yearsArr;
}

export const uid = () => {
  const head = Date.now().toString(36);
  const tail = Math.random().toString(36).substring(2);
  return head + tail;
};
