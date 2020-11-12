const { default: httpCommon } = require("../http-common");
import http from "../http-common";

const getAll = () => {
  return http.get("/assignments");
};

const get = (id) => {
  return http.get(`/assignments/${id}`);
};

const create = (data) => {
  return http.post("/assignments", data);
};

const update = (id, data) => {
  return http.put(`/assignments/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/assignments/${id}`);
};

const removeAll = () => {
  return http.delete("/assignments");
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};
