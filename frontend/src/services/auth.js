import Api from "./api";

const axios = require("axios").default;
const URL = "http://localhost:5000/api/auth";

const Auth = {
  signUpUser: async function loginUser(params) {
    try {
      let res = await Api.post(`${URL}/signup`, params);
      return res;
    } catch (error) {
      return error;
    }
  },
  loginUser: async function loginUser(params) {
    try {
      let res = await axios.post(`${URL}/signin`, params);
      return res;
    } catch (error) {
      return error.response;
    }
  },
  logoutUser: async function logoutUser() {
    try {
      let params = {};
      let res = await axios.post(`${URL}/signout`, params);
      return res;
    } catch (error) {
      return error.response;
    }
  },
  me: async function me() {
    try {
      let res = await axios.get(`${URL}/me`);
      return res;
    } catch (error) {
      return error.response;
    }
  },
  profileRoles: [
    {
      name: "Hub Manager",
      description:
        "The main function role of a hub manager is to manage incubation and acceleration programs for incubatees, start-ups and entrepreneurs",
    },
    {
      name: "Incubatee",
      description:
        "This is the core of the system. The role of incubatee is to engage in verious programs offered by hubs",
    },
    {
      name: "Investor",
      description:
        "The investor role is to manage investiments into startups registered into this platform",
    },
    {
      name: "Government Agency",
      description:
        "The government establishes the guiding laws, regulations and policies",
    },
    {
      name: "Coach",
      description:
        "The role of a coach, being freelance or attached to a hub is to help guide incubatees",
    },
    {
      name: "Mentor",
      description:
        "The role of a mentor, being freelance or attached to a hub is to help groome incubatees",
    },
  ],
};

export default Auth;
