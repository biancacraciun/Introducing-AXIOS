import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';

// you'll notice one thing though, you no longer see the interceptor printing the log for the request which
// was sent and the response which was fetched, because the interceptor was set up for the global axios object
// which we're not using anymore here in the blog container

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount () {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({ posts: updatedPosts })
                // console.log(response);
            })
            .catch(error => {
                this.setState({ error: true })
                console.log(error);
            })
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id })
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        if(!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author} 
                    clicked={ () => this.postSelectedHandler(post.id)}
                />
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;