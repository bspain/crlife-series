function numberToPathToken(n: number): string {
  if (n < 10) {
    return `0${n.toString()}`;
  } else return n.toString();
}

function dateToSeriesPath(d: Date): string {
  const month = d.getMonth() + 1;
  const date = d.getDate();

  return `${numberToPathToken(month)}${numberToPathToken(date)}`;
}

export { dateToSeriesPath };
