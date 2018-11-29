import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class PostsNew extends Component {
    renderField(field){ //field obj contains some event handlers that we need to wire up to the jsx we are returning
        //the input we enter should be tracked to the field component
        return (
            <div className="form=group">
                <label>{field.label}</label>
                <input
                className="form-control"
                type="text"
                {...field.input}
                />
                {field.meta.touched? field.meta.error: '' }
            </div>
        );
    }
    //field.input contains a bunch of different event handlers and a bunch of different props onChnge, onBlur, onFocus, it also has the value of the event
    //... helps us save trouble of writing onChange: field.input.onChange etc. etc, 

    onSubmit(values){
        //this === our component
        console.log(values);
    }

    render(){
        const {handleSubmit} = this.props;
        //handleSubmit is a property that has been passed to the component on behalf of redux form
        //look at the last line in this file, when we wire up redux form and connect it to PostsNew component, it adds a bunch of new properties

        //handleSUbmit runs the redux form side of things, does validate, if valid, then it calls the callback this.onSubmit
        //we bind this because the onSubmit is a callback function will be called in a different context and we still need to be able to access this which we want to be our component 
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                label="Title"
                name="title" 
                component={this.renderField}
                />
                <Field 
                label="Categories"
                name="categories" 
                component={this.renderField}
                />
                 <Field 
                label="Post Content"
                name="content" 
                component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}
//label is a property name - can be anything
//name prop must be identical to validate error property so that they are connected
//redux form doesn't take care of things like submitting the form data to server, etc.

//component propm should be a function that returns some amount of jsx


//validate will be called when user is trying to submit the form
function validate(values){ //values name by convention, values is an obj that contains all values that user entered in the form
    //console.log(values) -> eg. {title: 'asf', categories: 'abx', content: 'qeqw' }
    const errors = {};

    //validate the input from the 'values'
    if(!values.title) {
        errors.title = 'Enter a title!';
    }

    if(!values.categories) {
        errors.categories = 'Enter some categories';
    }

    if(!values.content) {
        errors.content = 'Enter some content please!';
    }
    return errors;
}
//if errors obj is empty, redux form assumes nothing is wrong with the form, the form is fine to submit
//if there is some error present (errors obj has any properties), then passing it through the errors obj is how we communicate with the redux form,
// and redux assumes the form is invalid

export default reduxForm({
    validate,
    form: 'PostsNewForm' //multiple forms may exist on same page, make sure the string you assign to the form prop is unique, we don't want merged states bwtween two different forms
})(PostsNew);

//reduxForm is a function that is similar to connect helper from 'react-redux'
//reduxForm allows our component to communicate with the additional reducer that we wired in , formReducer
