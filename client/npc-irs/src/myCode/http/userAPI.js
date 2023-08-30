import { $host } from "./index";

export const createUser = async (username, password) => {
  const { data } = await $host.post("api/user/", { username, password });
  return data;
};

export const getUser = async (id) => {
  const { data } = await $host.get("api/user/" + id);
  return data;
};

export const getAllUsers = async (limit, offset) => {
  const { data } = await $host.get("api/user/", {
    params: {
      limit,
      offset,
    },
  });
  return data;
};
