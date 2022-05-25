import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../AuthContext';


const BookmarkRow = ({ Bookmark, onDeleteClick, onEditClick }) => {

    const [editMode, setEditMode] = useState(false);
    const [newTitle, setTitle] = useState('');
    const history = useHistory();
    const { url, title } = Bookmark;

    useEffect(() => {
        setTitle(title);
    }, []);
    const editClick = () => {
        setEditMode(true);
    }
    const cancelClick = () => {
        setEditMode(false);
    }
    const updateClick = () => {
        Bookmark.title = newTitle;
        onEditClick(Bookmark);
        setEditMode(false);
    }

    return (
        <tr>
            <td>
                {editMode == false && title}
                {editMode === true && <input value={newTitle} type="text" onChange={e => setTitle(e.target.value)} />}
            </td>
            <td><a href={url}>{url}</a></td>
            <div>
                {editMode == true &&<>

                    <button className='btn btn-warning ' onClick={updateClick} >Update</button>
                    <button className='btn btn-info' onClick={cancelClick}>Cancel</button></>}



                {editMode == false &&
                    <button className='btn btn-primary ' onClick={editClick} >Edit Title</button>}
                <button className='btn btn-danger ' onClick={() => onDeleteClick(Bookmark)}>Delete</button>
            </div>
        </tr>
    );

}
export default BookmarkRow;