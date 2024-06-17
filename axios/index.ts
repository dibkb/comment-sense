import axios from "axios";
export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NODE_API,
  timeout: 1000,
});
