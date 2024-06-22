import axios from "./axios";

export const registerRequest = async (user) =>
  axios.post(`/auth/register`, user);

export const loginRequest = async (user) => axios.post(`/auth/login/${user.email}/${user.password}`);

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);
