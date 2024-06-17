import { instance } from "@/axios";

export const getVideoInfo = async (id: string) => {
  try {
    const res = await instance.get(`get-info/${id}`);
    return res.data();
  } catch (error) {}
};
