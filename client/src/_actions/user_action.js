import axios from "axios";
import { LOGIN_USER } from "./types";
export function loginUser(dataTosubmit) {
  const request = axios
    .post("http://localhost:4000/api/users/login", dataTosubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}
