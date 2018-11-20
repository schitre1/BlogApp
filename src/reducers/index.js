import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import {reducer as formReducer} from 'redux-form';

//as is a keyword, we are basically renaming reducer property in case some other reducer comes into the picture too

const rootReducer = combineReducers({
    posts: PostsReducer,
    form: formReducer
});

//formReducer is going to be applied to the form piece of state everywhere.
export default rootReducer;
