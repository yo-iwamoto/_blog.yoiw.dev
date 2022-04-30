const status = {
  ok: 'ok',
  error: 'error',
} as const;

export const okPageProps = <T>(data: T) => ({
  props: {
    status: status.ok,
    data,
  },
});

export const errorCodes = ['internal', 'unauthorized', 'invalid-request', 'not-found'] as const;

export const errorPageProps = <
  T extends {
    code: typeof errorCodes[number];
    message: string;
    [x: string]: string;
  }
>(
  data: T
) => ({
  props: {
    status: status.error,
    data,
  },
});
