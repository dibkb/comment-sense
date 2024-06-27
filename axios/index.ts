import axios from "axios";
export const nodeApiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NODE_API,
});
export const fastApiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FAST_API,
});
