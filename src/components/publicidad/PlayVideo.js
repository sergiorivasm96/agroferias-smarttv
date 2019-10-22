import React from 'react';

/* <iframe width="100%" height="500" src="https://www.youtube.com/embed/videoseries?list=PLC0w3lEHx2SF3NsbnqnLbWBWyF_3g0cjZ&autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen"></iframe> */

class PlayVideo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <iframe width="100%" height="521" src="https://www.youtube.com/embed/videoseries?list=PLC0w3lEHx2SF3NsbnqnLbWBWyF_3g0cjZ&autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen"></iframe>
            </div>
        )
    }
}

function formarUrl(id) {
    return 'http://www.youtube.com/embed?listType=playlist&list=' + id + '&controls=0';
}

export default PlayVideo;