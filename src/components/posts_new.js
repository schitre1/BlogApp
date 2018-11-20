import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class PostsNew extends Component {
    renderTitleField(field){ //field obj contains some event handlers that we need to wire up to the jsx we are returning
        //the input we enter should be tracked to the field component
        return (
            <div>
                <input
                type="text"
                {...field.input}
                />
            </div>
        );
    }
    //field.input contains a bunch of different event handlers and a bunch of different props onChnge, onBlur, onFocus, it also has the value of the event
    //... helps us save trouble of writing onChange: field.input.onChange etc. etc, 
    render(){
        return (
            <form>
                <Field 
                name="title" 
                component={this.renderTitleField}/>
            </form>
        );
    }
}

//component propm should be a function that returns some amount of jsx

export default reduxForm({
    form: 'PostsNewForm' //multiple forms may exist on same page, make sure the string you assign to the form prop is unique, we don't want merged states bwtween two different forms
})(PostsNew);

//reduxForm is a function that is similar to connect helper from 'react-redux'
//reduxForm allows our component to communicate with the additional reducer that we wired in , formReducer
