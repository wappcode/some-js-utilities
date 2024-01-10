const SECONDS_MILISECONDS = 1000;
const MINUTES_MILISECONDS = 60 * SECONDS_MILISECONDS;
const HOURS_MILISECONDS = 60 * MINUTES_MILISECONDS;
const DAYS_MILISECONDS = 24 * HOURS_MILISECONDS;
const MONTHS_MILISECONDS = 30.4375 * DAYS_MILISECONDS; // promedio de dias de 4 años para incluir año bisiesto
const YEARS_MILISECONDS = 12 * MONTHS_MILISECONDS;

export interface ElapsedPeriod {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const trimPeriodFormated = (str: string) => {
  const strNoDobleSpace = str.replace(/\s\s+/, ' ').trim();
  // Quita el texto "y" cuando el siguiente valor esta vacío
  // Por ejemplo "2 años y "  lo cambia por "2 años"
  // "y 2 meses" lo cambia por "2 meses"
  const strRemoveFinalY = strNoDobleSpace.replace(/y$/, '').trim();
  const strRemoveStartY = strRemoveFinalY.replace(/^y/, '').trim();
  return strRemoveStartY;
};
/**
 * Calcula los años, meses, dias, horas, minutos y segundos transcurridos entre una fecha y otra
 */
export const calculateElapsedPeriod = (start: Date, end: Date): ElapsedPeriod => {
  const diff = end.getTime() - start.getTime();
  const years = Math.floor(diff / YEARS_MILISECONDS);
  let remaining = diff % YEARS_MILISECONDS;
  const months = Math.floor(remaining / MONTHS_MILISECONDS);
  remaining = remaining % MONTHS_MILISECONDS;
  const days = Math.floor(remaining / DAYS_MILISECONDS);
  remaining = remaining % DAYS_MILISECONDS;
  const hours = Math.floor(remaining / HOURS_MILISECONDS);
  remaining = remaining % HOURS_MILISECONDS;
  const minutes = Math.floor(remaining / MINUTES_MILISECONDS);
  remaining = remaining % MINUTES_MILISECONDS;
  const seconds = Math.floor(remaining / SECONDS_MILISECONDS);
  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds
  };
};

export const formatPeriodYearsLocaleES = (period: ElapsedPeriod): string => {
  const { years } = period;
  let periodStr = '';
  if (years > 0) {
    const suffix = years > 1 ? 'años' : 'año';
    periodStr += `${years} ${suffix}`;
  }
  return periodStr;
};
export const formatPeriodMonthsLocaleES = (period: ElapsedPeriod): string => {
  const { months } = period;
  let periodStr = '';
  if (months > 0) {
    const suffix = months > 1 ? 'meses' : 'mes';
    periodStr += `${months} ${suffix}`;
  }
  return periodStr;
};
export const formatPeriodDaysLocaleES = (period: ElapsedPeriod): string => {
  const { days } = period;
  let periodStr = '';
  if (days > 0) {
    const suffix = days > 1 ? 'días' : 'día';
    periodStr += `${days} ${suffix}`;
  }
  return periodStr;
};
export const formatPeriodHoursLocaleES = (period: ElapsedPeriod): string => {
  const { hours } = period;
  let periodStr = '';
  if (hours > 0) {
    const suffix = hours > 1 ? 'horas' : 'hora';
    periodStr += `${hours} ${suffix}`;
  }
  return periodStr;
};
export const formatPeriodMinutesLocaleES = (period: ElapsedPeriod): string => {
  const { minutes } = period;
  let periodStr = '';
  if (minutes > 0) {
    const suffix = minutes > 1 ? 'minutos' : 'minuto';
    periodStr += `${minutes} ${suffix}`;
  }
  return periodStr;
};
export const formatPeriodSecondsLocaleES = (period: ElapsedPeriod): string => {
  const { seconds } = period;
  let periodStr = '';
  if (seconds > 0) {
    const suffix = seconds > 1 ? 'segundos' : 'segundo';
    periodStr += `${seconds} ${suffix}`;
  }
  return periodStr;
};
// TODO: agregar pruebas para esta función
/**
 * Crea una cadena en español indicando el tiempo transcurrido. Puede retornar una cadena vacía.
 * Level 1 = Solo años
 * Level 2 = Años y meses
 * Level 3 = Años meses y días
 * Level 4 = Años, meses, días y horas
 * Level 5 = Años, meses, días, horas y minutos
 * Level 6 = Años, meses, días, horas, minutos y segundos
 * @param period
 * @param level
 * @returns
 */
export const formatPeriodLocaleES = (
  period: ElapsedPeriod,
  level: 1 | 2 | 3 | 4 | 5 | 6 = 3
): string => {
  let periodStr = '';
  const yearsStr = formatPeriodYearsLocaleES(period);
  if (level === 1) {
    return trimPeriodFormated(yearsStr);
  }
  periodStr += yearsStr;
  const monthsStr = formatPeriodMonthsLocaleES(period);
  if (level === 2) {
    return trimPeriodFormated(`${periodStr} y ${monthsStr}`);
  }
  periodStr += ` ${monthsStr}`;
  const daysStr = formatPeriodDaysLocaleES(period);
  if (level === 3) {
    return trimPeriodFormated(`${periodStr} y ${daysStr}`);
  }
  periodStr += ` ${daysStr}`;
  const hoursStr = formatPeriodHoursLocaleES(period);
  if (level === 4) {
    return trimPeriodFormated(`${periodStr} y ${hoursStr}`);
  }
  periodStr += ` ${hoursStr}`;
  const minutesStr = formatPeriodMinutesLocaleES(period);
  if (level === 5) {
    return trimPeriodFormated(`${periodStr} y ${minutesStr}`);
  }
  periodStr += ` ${minutesStr}`;
  const secondsStr = formatPeriodSecondsLocaleES(period);
  if (level === 6) {
    return trimPeriodFormated(`${periodStr} y ${secondsStr}`);
  }
  return trimPeriodFormated(periodStr);
};
