import React, { useEffect, useState } from "react";
// import FroalaEditor from 'react-froala-wysiwyg';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { createPost, getPosts, deletePost } from "../../actions/postActions";
import ReactHtmlParser from 'react-html-parser';
import SunEditor, { buttonList } from 'suneditor-react';

import 'suneditor/dist/css/suneditor.min.css'

const Landing = () => {
  const editorRef = React.useRef()

  const [model, setModel] = useState('');
  const [title, setTitle] = useState('');
  const [reload, setReload] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const { posts } = useSelector(state => state.posts);
  const { error } = useSelector(state => state.errors);

  useEffect(() => {
    if (reload) {
      dispatch(getPosts());
      setReload(false);
    }
  }, [reload])

  const handleInputChange = (e) => { setTitle(e.target.value) }

  const onSubmit = (e) => {
    dispatch(createPost({ title: title, model: model }));

    setModel('');
    setTitle('');
  }
  const gotoPost = (id) => { history.push('/post/' + id); }

  const onDeletePost = (id) => {
    dispatch(deletePost(id));
    console.log('delete')
  }

  return (
    <div className="container">
      <h1>LANDING</h1>

      <div className="row">
        <div>
          <input value={title} onChange={handleInputChange} type="text" className="form-control mb-3" required />

          <SunEditor
            ref={editorRef}
            value={model}
            setContents={model}
            setOptions={{
              height: 200,
              buttonList: buttonList.complex
            }}
            onChange={e => setModel(e)}
          />

          <button onClick={onSubmit} className="btn btn-primary mt-3">SUBMIT</button>
        </div>

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <table className="table table-striped">
          <thead>
            <tr><th>ID</th><th>Title</th><th>Date</th></tr>
          </thead>
          <tbody>
            {posts && posts.length > 0 && posts.map((post, index) =>
              <tr key={index} >
                <td>{post._id}</td>
                <td>{post.title}</td>
                {/* <td suppressContentEditableWarning={true}>{ReactHtmlParser(post.model)}</td> */}
                <td>{post.date}</td>
                <td><button onClick={() => gotoPost(post._id)} className="btn btn-secondary">View</button></td>
                <td><button onClick={() => onDeletePost(post._id)} className="btn btn-secondary">Delete</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Landing;
