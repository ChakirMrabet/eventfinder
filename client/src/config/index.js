import all from "./all";
import dev from "./dev";
import prod from "./prod";

const config = process.env.NODE_ENV === "production" ? prod : dev;

export default { ...all, ...config };
