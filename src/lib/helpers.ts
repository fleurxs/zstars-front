/**
 * Склоняет слово в зависимости от числа
 * @param count - число
 * @param forms - массив форм слова [единственное, множественное (2-4), множественное (5+)]
 * @returns правильная форма слова
 */
export function declineWord(count: number, forms: [string, string, string]): string {
  const absCount = Math.abs(count);

  if (absCount % 10 === 1 && absCount % 100 !== 11) {
    return forms[0]; // месяц
  } else if (absCount % 10 >= 2 && absCount % 10 <= 4 && (absCount % 100 < 10 || absCount % 100 >= 20)) {
    return forms[1]; // месяца
  } else {
    return forms[2]; // месяцев
  }
}

/**
 * Возвращает правильное склонение слова "месяц" для заданного числа
 * @param count - количество месяцев
 * @returns правильная форма слова
 */
export function declineMonths(count: number): string {
  return declineWord(count, ['месяц', 'месяца', 'месяцев']);
}
