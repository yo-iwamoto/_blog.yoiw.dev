const ENV = {
  API_HOST: process.env.NEXT_PUBLIC_API_HOST as string,
};

Object.values(ENV).forEach((v) => {
  if (v === undefined) {
    process.exit();
  }
});

export { ENV };
