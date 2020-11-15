import http from "../api";

const getAll = () => {
  return http.get(`/assignments`);
};

const get = (id) => {
  return http.get(`/assignments/${id}`);
};

const getBySubject = (subject) => {
  return http.get(`/assignments?subject=${subject}`);
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
  getBySubject,
  create,
  update,
  remove,
  removeAll,
};
