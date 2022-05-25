import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../AuthContext';

const AddBookmark = () => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const history = useHistory();

    const onSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/bookmark/addbookmark', { title, url });
        history.push('/mybookmarks');
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6 offset-md-3 card card-body bg-light">
                    <h3>Add Bookmark</h3>
                    <form onSubmit={onSubmit}>
                        <input type="text" name="title" placeholder="Title" class="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                        <br />
                        <input type="text" name="url" placeholder="Url" class="form-control" value={url} onChange={e => setUrl(e.target.value)} />
                        <br />
                        <button className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        </div>

    );
}
export default AddBookmark;