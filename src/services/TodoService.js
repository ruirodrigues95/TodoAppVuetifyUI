import axios from "axios";

export async function getTodos() {
  return axios
    .get("http://localhost:3000/")
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e);
    });
}

export async function addTodo(title) {
  return await axios
    .post("http://localhost:3000/", {
      title: title,
    })
    .then(() => {
      return { title: title, checked: false };
    })
    .catch((e) => console.log(e));
}

export async function updateTodo(id) {
  axios.put(`http://localhost:3000/todos/${id}`).catch((e) => console.log(e));
}

export async function deleteTodo(id) {
  axios
    .delete(`http://localhost:3000/todos/${id}`)
    .catch((e) => console.log(e));
}
