import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';

//BrowserRouter is for the history..it tells react to look at complete url to decide what to do

//import App from './components/app';
import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

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
        <Switch>
          <Route path="/posts/new" component={PostsNew}/>
          <Route path="/posts/:id" component={PostsShow}/>
          <Route path="/" component={PostsIndex}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
  //the order in which we define routes makes a big difference

  //PostsNew component will have access to a bunch of props passed by the React Router

  //A bug seen with React router -  on hitting /posts/new we see both PostsIndex and PostsNew compoennts on screen
  //Reason is it fuzzily matches path so basicallt /posts/new includes / or it will also include /posts, etc.
  //To solve this, we add the switch component
  //Make sure to put most specific routes at the top of the list inside switch
  //Switch is going to check inside the list of routes and see what's the first route that matches the coming url pattern