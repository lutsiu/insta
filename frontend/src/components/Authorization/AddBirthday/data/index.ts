
export const months: string[] = [
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
  'December'
];
() => {

};

export const years: number[] = (() => {
  const yearsArray: number[] = [];
  const minYear = new Date().getFullYear() - 105;
  const maxYear = new Date().getFullYear();
  for (let i: number = minYear; i <= maxYear; i++) {
    yearsArray.push(i);
  }
  return yearsArray;
})();



