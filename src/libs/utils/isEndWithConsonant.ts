export const isEndWithConsonant = (korStr: string): boolean => {
  const finalChrCode = korStr.charCodeAt(korStr.length - 1);
  const finalConsonantCode = (finalChrCode - 44032) % 28;
  return finalConsonantCode !== 0;
};
