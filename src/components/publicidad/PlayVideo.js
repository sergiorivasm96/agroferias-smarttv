import React from 'react';

/* <iframe width="100%" height="500" src="https://www.youtube.com/embed/videoseries?list=PLC0w3lEHx2SF3NsbnqnLbWBWyF_3g0cjZ&autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen"></iframe> */

class PlayVideo extends React.Component {

    handlerClickBack() {
        console.log('back')
        window.location.pathname = "/publicidad";
    }

    salir() {
        window.location.pathname = "/publicidad";
    }

    render() {
        let idPlaylist = true ? localStorage.getItem("codigoVideo") : "PLC0w3lEHx2SF3NsbnqnLbWBWyF_3g0cjZ";
        console.log(idPlaylist[0] + idPlaylist[1])
        if (idPlaylist[0] !== 'P' && idPlaylist[1] !== 'L') {
            return (
                <div>
                    Video Invalido
                </div>
            )
        }
        let srcUrl = "https://www.youtube.com/embed/videoseries?list=" + idPlaylist + "&modestbranding=1&autoplay=1&controls=0&fs=0&loop=1&rel=0&showinfo=0&disablekb=1"
        return (
            <div style={videoContainerStyle}>
                <iframe style={iframeStyle} src={srcUrl} frameBorder="0" title='iframeTitle'
                    allow="autoplay; encrypted-media" allowFullScreen="allowfullscreen"></iframe>
                <input style={{ display: "none" }} id={"botonAtras"} className="item-focusable focused-item" onClick={this.salir} type="button" />
            </div>
        )
    }
}

window.addEventListener("keypress", escucharEnter, false);
function escucharEnter(e) {
    var keyCode = e.keyCode;
    console.log("Escuche " + keyCode)
    if (keyCode == 13) {
        window.removeEventListener("keypress", escucharEnter, false);
        var first = window.location.pathname
        first.indexOf(1);
        first.toLowerCase();
        first = first.split("/")[1];
        if (first == "playvideo") {
            window.location.pathname = "/publicidad";
        }
    }
};

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

// function formarUrl(id) {
//     return 'http://www.youtube.com/embed?listType=playlist&list=' + id + '&controls=0';
// }

export default PlayVideo;