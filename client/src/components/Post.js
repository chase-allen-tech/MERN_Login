import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getPostById, getPostByTitle } from '../actions/postActions';
import ReactHtmlParser from 'react-html-parser';

const Post = () => {
    const { postId } = useParams();
    const { post } = useSelector(state => state.posts)
    const dispatch = useDispatch();
    const [reload, setReload] = useState(true);

    useEffect(() => {
        if (reload) {
            if (!isNaN(postId)) {
                dispatch(getPostById(postId));
            } else {
                dispatch(getPostByTitle(postId));
                console.log('ENTER');
            }
            setReload(false);
        }
    }, [reload]);

    return (
        <>
            {
                post && <div className="container" >
                    <div>{post.title}</div>
                    <div>{ReactHtmlParser(post.model)} </div>
                    <p>{post.date}</p>
                </div >
            }
        </>
    )
}

export default Post;