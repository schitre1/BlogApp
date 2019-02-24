import axios from 'axios';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
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

export function createPost(values, callback) {
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values) //second arg is the data we want to send to the api
    .then(() => callback());
    //call the callback after api req has completed successfully.
    return {
        type: CREATE_POST,
        payload: request
    };
}

//now we want to fetch only a single post (id of post is passed as argument)
export function fetchPost(id){
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
    return {
        type: FETCH_POST,
        payload: request
    }
}

export function deletePost(id, callback) {
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
                        .then(() => callback());
    return {
        type: DELETE_POST,
        payload: id //just return the id so we can remove the post from our application state as well
    }
}