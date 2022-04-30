/* eslint-disable no-console */
export const debugLog = (content: unknown, marker = 'log') => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[${marker}]`);
    console.log(content);
  }
};

export const debugErrorLog = (content: unknown, marker = 'log') => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[${marker}]`);
    console.error(content);
  }
};
