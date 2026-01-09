export const delaySeconds = (second: number = 1000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, second);
  });
};
