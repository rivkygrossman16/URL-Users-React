import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../AuthContext';
import HomeRow from '../Components/HomeRow';

const Home = () => {
    const [top5BookMarks, setTop5BookMarks] = useState([]);

    useEffect(() => {
        const getTop5 = async () => {
            const { data } = await axios.get('/api/bookmark/gettop');
            console.log(data);
            setTop5BookMarks(data);
        }

        getTop5();

    }, []);

    return <
        div id="root" >
        <div>
            <div className="container">
                <div>
                    <h1>Welcome to the React Bookmark Application.</h1>
                    <h3>Top 5 most bookmarked links</h3>
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Url</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {top5BookMarks && top5BookMarks.map((m, i) =>
                                <HomeRow
                                    key={i}
                                    Bookmark={m}
                                />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div >
}
export default Home;