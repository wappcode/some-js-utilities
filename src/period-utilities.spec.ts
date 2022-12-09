import {
  calculateElapsedPeriod,
  formatPeriodLocaleES,
} from './period-utilities';

describe('Period utilities', () => {
  it('Probando con años y meses', () => {
    const date1 = new Date();
    const date2 = new Date();
    date2.setFullYear(date2.getFullYear() + 2);
    date2.setMonth(date2.getMonth() + 2);
    const periodo = calculateElapsedPeriod(date1, date2);
    const periodLabel = formatPeriodLocaleES(periodo, 2);
    expect(periodo.years).toEqual(2);
    expect(periodo.months).toEqual(2);
    expect(periodLabel).toEqual('2 años y 2 meses');
  });
  it('Probando con un año y un mes', () => {
    const date1 = new Date();
    const date2 = new Date();
    date2.setFullYear(date2.getFullYear() + 1);
    date2.setMonth(date2.getMonth() + 1);
    const periodo = calculateElapsedPeriod(date1, date2);
    const periodLabel = formatPeriodLocaleES(periodo, 2);
    expect(periodLabel).toEqual('1 año y 1 mes');
  });
  it('Probando con solo años', () => {
    const date1 = new Date();
    const date2 = new Date();
    date2.setFullYear(date2.getFullYear() + 2);
    const periodo = calculateElapsedPeriod(date1, date2);
    const periodLabel = formatPeriodLocaleES(periodo, 2);
    expect(periodLabel).toEqual('2 años');
  });
  it('Probando con solo meses', () => {
    const date1 = new Date();
    const date2 = new Date();
    date2.setMonth(date2.getMonth() + 4);
    date2.setDate(date2.getDate() + 1);
    const periodo = calculateElapsedPeriod(date1, date2);
    const periodLabel = formatPeriodLocaleES(periodo, 2);
    expect(periodLabel).toEqual('4 meses');
  });
  it('Probando nivel 6', () => {
    const date1 = new Date();
    const date2 = new Date();
    date2.setFullYear(date2.getFullYear() + 2);
    date2.setMonth(date2.getMonth() + 4);
    date2.setDate(date2.getDate() + 1);
    date2.setHours(date2.getHours() + 1);
    date2.setMinutes(date2.getMinutes() + 1);
    date2.setSeconds(date2.getSeconds() + 2);
    const periodo = calculateElapsedPeriod(date1, date2);
    const periodLabel = formatPeriodLocaleES(periodo, 6);
    expect(periodLabel).toEqual(
      '2 años 4 meses 18 horas 1 minuto y 2 segundos'
    );
  });
});
