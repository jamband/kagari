import type { DetailedError } from "hono/client";

export type Feedback<T> = Omit<DetailedError, "detail"> & {
  detail: {
    data: {
      message: { [K in keyof Partial<T>]: string };
    };
  };
};
