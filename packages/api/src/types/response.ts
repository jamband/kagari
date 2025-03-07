export type InvalidResponseBody = {
  message: string;
};

export type InvalidJsonResponseBody<T> = {
  message: { [K in keyof Partial<T>]: string };
};
