function MonthToDisplay(mon: string): string {
  switch (mon) {
    case '01':
      return 'Jan';
    case '02':
      return 'Feb';
    case '03':
      return 'Mar';
    case '04':
      return 'Apr';
    case '05':
      return 'May';
    case '06':
      return 'Jun';
    case '07':
      return 'Jul';
    case '08':
      return 'Aug';
    case '09':
      return 'Sep';
    case '10':
      return 'Oct';
    case '11':
      return 'Nov';
    case '12':
      return 'Dec';
  }
}

function DayToDisplay(day: string): string {
  if (day[0] === '0') {
    return day[1];
  } else {
    return day;
  }
}

export function DisplayName(ref: string): string {
  // Split ref into mon / day
  const mon = ref.substr(0, 2);
  const day = ref.substr(2, 2);

  return `${MonthToDisplay(mon)} ${DayToDisplay(day)}`;
}
