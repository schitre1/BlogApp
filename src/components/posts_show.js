import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions';


class PostsShow extends Component {
    componentDidMount(){
        //if we don't have a post only then fetch it
        if(!this.props.post) {
            const {id} = this.props.match.params; //to get id from url, provided to us directly by the react router
            this.props.fetchPost(id);
        } 
    }

    onDeleteClick(){
        const {id} = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        }); 
        
        //deletePost is an action creator
        //we could have written it as this.props.post.id but it is not a good approach
        //because then it assumes we have the post currently existing
    }

    render(){
        const {post} = this.props;
        //this.props === ownProps

        //when the post data hasn't yet come, these kinds of issues show up in react projects all the time so you handle
        //them as follows
        if(!post){
            return <div>Loading..</div>;
        }
        return (
            <div>
                <Link to="/">Back to Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3> {post.title} </h3>
                <h6> Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps({posts}, ownProps){ //ownProps :props obj that is going into this component
    return {post : posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);