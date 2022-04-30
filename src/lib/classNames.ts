type Args = (string | Record<string, boolean>)[];

// ポップアップが大きくなると邪魔なので JSDoc は使用していない
// @example cn('h-10', { 'hidden': false, 'flex': true }) // => returns 'h-10 flex'
export const cn = (...args: Args) => {
  const classNames: string[] = [];

  args.forEach((value) => {
    if (typeof value === 'string') {
      classNames.push(value);
    }

    Object.entries(value).forEach(([className, condition]) => {
      if (condition) {
        classNames.push(className);
      }
    });
  });

  return classNames.join(' ');
};
