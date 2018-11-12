import {FETCH_POSTS} from '../actions'; //since we are importing from index.js we don't need to specify any file
import _ from 'lodash';

export default function (state = {}, action) { //default state is an obj
    switch(action.type) {
        case FETCH_POSTS:
            //console.log(action.payload.data); //[post1, post2]
            //but we need to transform it to  {4: post1, id2: post2} etc format
            //we will just use the lodash module for this
            return _.mapKeys(action.payload.data, 'id'); //and then state['4'] gives post obj with id 4 like that for later references

        default:
        return state; //default is make no change to state and return
    }
}