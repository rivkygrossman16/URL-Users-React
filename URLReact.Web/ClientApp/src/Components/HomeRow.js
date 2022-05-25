import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../AuthContext';


const HomeRow = ({ Bookmark }) => {
    const { url, count } = Bookmark;
    return (
        <tr>
            <td><a href={url}>{url}</a></td>
            <td>{count}</td>
        </tr>
    );

}
export default HomeRow;