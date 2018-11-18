import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route} from 'react-router-dom';
import promise from 'redux-promise';

//BrowserRouter is for the history..it tells react to look at complete url to decide what to do

//import App from './components/app';
import reducers from './reducers';
import PostsIndex from './components/posts_index';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

//two small test components to understand react router
// class Hello extends React.Component {
//   render(){
//     return <div>Hello!</div>;
//   }
// }

// class Goodbye extends React.Component {
//   render(){
//     return <div>Goodbye!</div>;
//   }
// }

//if user gives path /hello react has to render Hello Component
//if user gives path /goodbye react has to render Goodbye Component
//Header text for eg below will always show

//inside the BrowserRouter div:, was
//Header
// <Route path="/hello" component={Hello} />
//<Route path="/goodbye" component={Goodbye} />
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Route path="/" component={PostsIndex}/>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
