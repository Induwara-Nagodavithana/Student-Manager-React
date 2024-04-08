import axios from "axios";
import Message from "utils/messages";

const instance = axios.create({
  // baseURL: "http://node-env.eba-pakmdcpw.us-east-2.elasticbeanstalk.com/",
  baseURL: "http://localhost:8080/",
  timeout: 30000,
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",

    "Content-type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {

    console.log(response.status);
    return response;
  },
  (error) => {

    console.log(error);
    console.log(error.response);
    if (error.response !== undefined && error.response.status === 401) {
      console.log("error");
      if ("sign-in" != window.location.href.slice(-7)) {
        window.location = "/";
      }
    } else {
      let msg = "Cannot find the Server";
      if (error.response !== undefined && error.response.data.message !== undefined) {
        msg = error.response.data.message;
      }
      Message.addMessage({ title: "Error was Occured!", msg, type: "danger" });
    }
    return Promise.reject(error);
  }
);

export default instance;
