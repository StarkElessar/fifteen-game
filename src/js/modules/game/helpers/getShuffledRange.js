export const getShuffledRange = (length) =>
  Array
    .from({ length }, (_, i) => i || null)
    .sort(() => Math.random() - 0.5)