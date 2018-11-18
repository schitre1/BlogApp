import axios from 'axios';
export const FETCH_POSTS = 'FETCH_POSTS';
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=BLOGAPP1234';

//for ajax requests we will need axios
//and then redux-promise to handle the promise returned by axios

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
    return {
        type: FETCH_POSTS,
        payload: request
    };
}