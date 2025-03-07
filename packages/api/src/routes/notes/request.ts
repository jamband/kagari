import * as v from "valibot";

export const noteIdParamRequest = v.pipe(
  v.string(),
  v.regex(/^[0-9]+$/),
  v.transform((input) => Number(input)),
);
