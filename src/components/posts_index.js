import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';
import _ from 'lodash';

class PostsIndex extends Component {
    componentDidMount() {
        this.props.fetchPosts();
        //one time when component loads on screen.
        //lifecycle method
        //automatically called by react
        //eg if we want to hold up loading component till data is fetched
    }

    renderPosts(){
        //now we have an obj of posts so we use lodash's map function to deal with it
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item" key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                </li>
            )
        });
    }
    //currently we are fetching post records twice in our application
    //omce on index page and once on the show page

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}



//whenever we want to consume anything from application level state inside a component we always define the function
//mapStateToProps

function mapStateToProps(state) {
    return {posts: state.posts};
}


//export default connect(null, {fetchPosts: fetchPosts})(PostsIndex);

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
//instead of using mapDispatch to props, another way to wire up action creator is above
//we still have access to this.props.fetchPosts inside the component


//in this application we are not really changing html docs but giving user the impression of that
//by adding / removing components from screen