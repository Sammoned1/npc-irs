import { $host } from "./index";

export const createTask = async (task, description, userId) => {
  const { data } = await $host.post("api/task/", { task, description, userId });
  return data;
};

export const getTask = async (id) => {
  const { data } = await $host.get("api/task/" + id);
  return data;
};

export const getAllTasks = async (userId, assigned) => {
  const { data } = await $host.get("api/task/", {
    params: {
      userId,
      assigned,
    },
  });
  return data;
};

export const deleteTask = async (selectedIds) => {
  const { data } = await $host.post("api/task/delete/", { selectedIds });
  return data;
};

// export const getUnassignedTasks = async ()=>{
//   const {data} = await $host.get("api/task/")
// }
