export const firstCapitalLetters = (word: string | undefined | null) => {
  const words = word?.trim().split(' ');

  return words
    ?.map(elements => {
      return elements[0].toUpperCase() + elements.substring(1).toLowerCase();
    })
    .join(' ');
};
