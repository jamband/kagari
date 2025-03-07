import { HTTPException } from "hono/http-exception";

const notFound = () => {
  throw new HTTPException(404);
};

export default notFound;
