import axios from "axios";

const API_URL = "http://127.0.0.1:3000/api/v1/";

const getPublicContent = () => {
  return axios.get(API_URL + "books");
};

const getBookDetails = (id) => {
  return axios.get(API_URL + `books/${id}`);
};

const getAllBorrowings = () => {
  return axios.get(API_URL + "borrowings");
};

const getMyBorrowings = (id) => {
  return axios.get(API_URL + `borrowed_books/${id}`);
};

const UserService = {
  getPublicContent,
  getBookDetails,
  getAllBorrowings,
  getMyBorrowings
};
export default UserService;
