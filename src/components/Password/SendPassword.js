import axios from "axios";

let URL;
process.env.NODE_ENV === "development" ? URL = "http://localhost:3001" : URL = "https://54.227.99.93:3001";

export const sendPassword = (mail, password) => {
  console.log(mail, password);
  axios.put(`${URL}/password/${mail}/${password}`)
    .then(res => {
      alert('Password changed successfully!');
    })
    .catch(err => console.error(err));
};

export const sendMail = (mail) => {
  axios.get(`${URL}/password/${mail}`)
    .then(res => res.data)
    .catch(err => console.error(err));
};
