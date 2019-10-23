import React from 'react';

/* <iframe width="100%" height="500" src="https://www.youtube.com/embed/videoseries?list=PLC0w3lEHx2SF3NsbnqnLbWBWyF_3g0cjZ&autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen"></iframe> */

class PlayVideo extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.getElementsByClassName("item-focusable")[0].focus();
    }

    render() {
        let idPlaylist = true ? localStorage.getItem("codigoVideo") : "PLC0w3lEHx2SF3NsbnqnLbWBWyF_3g0cjZ";
        let srcUrl = "https://www.youtube.com/embed/videoseries?list=" + idPlaylist + "&modestbranding=1&autoplay=1&controls=0&fs=0&loop=1&rel=0&showinfo=0&disablekb=1"
        return (
            <div style={videoContainerStyle}>
                <iframe style={iframeStyle} src={srcUrl} frameborder="0"
                    allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen"></iframe>
                <input style={{ display: "none" }} className="item-focusable"
                    action="action" onclick="window.history.go(-1); return false;" type="button" value="Back" />
            </div>
        )
    }
}

const videoContainerStyle = {
    "position": "absolute",
    "width": "100%",
    "height": "100%",
    "top": "0",
    "left": "0",
    "bottom": "0",
    "right": "0",
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "alignItems": "center"
}

const iframeStyle = {
    "width": "100%",
    "height": "100%"
}

function formarUrl(id) {
    return 'http://www.youtube.com/embed?listType=playlist&list=' + id + '&controls=0';
}

export default PlayVideo;