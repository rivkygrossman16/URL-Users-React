import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../AuthContext';
import BookmarkRow from '../Components/BookmarkRow';

const MyBookmarks = () => {
    const { user } = useAuthContext();
    const [bookmarks, setBookmarks] = useState();
    const history = useHistory();

    useEffect(() => {
        const getBookmarks = async () => {
            const { data } = await axios.get('/api/bookmark/getbookmarks');
            setBookmarks(data);
        }

        getBookmarks();

    }, []);

    const deleteBookmark = async (bookmark) => {
        await axios.post('/api/bookmark/deletebookmark', { ...bookmark });
        const { data } = await axios.get('/api/bookmark/getbookmarks');
        setBookmarks(data);
        history.push('/mybookmarks')
    }


    const editBookmark = async (bookmark) => {
        await axios.post('/api/bookmark/editbookmark', { ...bookmark });
        const { data } = await axios.get('/api/bookmark/getbookmarks');
        setBookmarks(data);
    }

    const { firstName, lastName } = user;
    return (
        
        < div id="root" >
            <div>
                <div className="container">
                    <div>
                        <h1>Welcome Back {firstName} {lastName}</h1>
                        <br />
                        <Link className="btn btn-large btn-block" to='/addbookmark' >
                            <button className="btn btn-primary btn-large btn-block">Add Bookmark </button>
                        </Link>
                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Url</th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookmarks && bookmarks.map((b, i) =>
                                    <BookmarkRow
                                        key={i}
                                        Bookmark={b}
                                        onDeleteClick={deleteBookmark}
                                        onEditClick={editBookmark}
                                    />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
        
        );
}

export default MyBookmarks;