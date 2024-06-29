import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const $nodeApiInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_NODE_API,
});
const $fastApiInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_FAST_API,
});
export const nodeApiInstance = setupCache($nodeApiInstance);
export const fastApiInstance = setupCache($fastApiInstance);
