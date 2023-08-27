import { $host } from "./index";

export const createTask = async ({ task, description, status, progress, userId }) => {
  const { data } = await $host.post("api/task/", { task, description, status, progress, userId });
  return data;
};

export const getTask = async (id) => {
  const { data } = await $host.get("api/task/" + id);
  return data;
};

export const getAllTasks = async () => {
  const { data } = await $host.get("api/task/");
  return data;
};
