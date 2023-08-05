import react, { Component } from 'react';
import axios from 'axios';
import ReactHtmlParser from "react-html-parser";

import BlogForm from "../blog/blog-form";
import BlogItem from '../navigation/blog/blog-item';
import BlogFeaturedImage from '../navigation/blog/blog-featured-image';

export default class BlogDetail extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            id: "",
            currentId: this.props.match.params.slug,
            blogItem: {},
            editMode: false
        };

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleFeatiuredImageDelete = this.handleFeatiuredImageDelete.bind(this);
        this.handleUpdateFormSubmission = this.handleUpdateFormSubmission.bind(this);
    }

    handleUpdateFormSubmission(blog) {
        this.setState({
            blogItem: blog,
            editMode: false
        })
    }

    handleFeaturedImageDelte() {
        this.setState({
            blogItem: {
                featured_image_url: ""
            }
        });

        this.handleEditClick() {
            if (this.props.loggedInStatus == "LOGGED_IN") {
                this.setState({ editMode: true });
        }
    }

getBlogItem() {
    axios.get(
        `https://marcedesspence.devcamp.space/portfolio/portfolio_blogs/${this.state
            .currentId
        }`
    ).then(response => {
        console.log("response", response);
        this.setState({
            blogItem: response.data.portfolio_blog
        });    
    }).catch(error => {
        console.log("getBlogItem error", error);
    });
}

componentDSidMount() {
    this.getBlogItem();
}

    render() {
        const {
            title,
            content,
            featured_image_url,
            blog_status
        } = this.state.blogItem;


        const contentManager = () => {
            if (this.state.editMode && this.props.loggedInStatus == "LOGGED_IN") {
                return ( 
                    <BlogForm 
                        handleFeaturedImageDelte={this.handleFeatiuredImageDelete}
                        handleUpdateFormSubmission={this.handleUpdateFormSubmission}
                        editMode={this.state.editMode} 
                        blog={this.state.blog} 
                    />
                );
            } else {
                return (
                    <div className="blog-container">
                        <h1 onClick={this.handleEditClick}>{title}</h1>

                        <BlogFeaturedImage img={featured_image_url} />
                    
                        <div className="content">{ReactHtmlParser(content)}</div>
                    </div>
                );
            }
        };


        return <div className="blog-container">{contentManager()}</div>;
                    <div className="content-container">
                        <h1 onClick={this.handleEditClick}>{title}</h1>

                        <BlogFeaturedImage img={featured_image_url} />
                    

                        <div className="content">{ReactHtmlParser(content)}</div>
                    </div>
                </div>
            );
        }
    }