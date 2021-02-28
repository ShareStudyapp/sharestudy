import React from 'react'
import PostForm from '../../components/Feed/PostForm';
import Divider from '@material-ui/core/Divider';
import "./WriteFeed.css";

import {Link} from 'react-router-dom';
function WriteFeed({history}) {
    return (
        <div>
            <div className="writefeed_area">
                <div className="left_area">
                    <Link to="/">
                        &lt; 새 게시물
                    </Link>
                </div>

            </div>
            <Divider />
            <PostForm history={history} />
        </div>
    )
}

export default WriteFeed
