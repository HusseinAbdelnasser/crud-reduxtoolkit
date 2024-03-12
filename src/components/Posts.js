import React, {useState} from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { addPost , deletePost, updatePost } from '../redux/postSlice';


export default function Posts() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  const [updateTitle, setUpdateTitle] = useState("")
  const [updateDescription, setUpdateDescription] = useState("");
  const[isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(null)

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items)

  return (
    <div>
      <div className='form'>
            <input type='text'
            value={title}
             placeholder='Enter Post Title'
             onChange={(e) => setTitle(e.target.value)} 
            />
            <input type='text'
            value={description}
             placeholder='Enter Post Desc'
             onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={() => {
            
              dispatch(addPost({id:posts.length +1, title, description}))
            
            setTitle("")
            setDescription("")
            }}>Add Post</button>
    </div>

      <div className='posts'>
           {posts.length > 0 ? posts.map(post => <div className='post'>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <button onClick={() => {
                  setIsEdit(true);
                  setId(post.id);
                }}>Edit</button>
                <button onClick={() => dispatch(deletePost(post.id))}>Delete</button>
                <br /> 

                {isEdit && id === post.id && (
                  <form className='form'>
                   <input type='text'
                      placeholder='updated Title' 
                      onChange={(e) => setUpdateTitle(e.target.value)} 
                    />
                   <input
                    type='text'
                    placeholder='updated Description'
                    onChange={(e) => setUpdateDescription(e.target.value)} />
                   <button onClick={() => {
                     dispatch(updatePost({id:post.id, title: updateTitle, description: updateDescription}));
                     setIsEdit(false);
                   }}>Update</button>
                  </form>
                )}
            </div>
            
            ): "There is no posts"}
      </div>
    </div>
  );
} 


