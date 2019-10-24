import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { textAlign } from '@material-ui/system';

/* <iframe width="100%" height="500" src="https://www.youtube.com/embed/videoseries?list=PLC0w3lEHx2SF3NsbnqnLbWBWyF_3g0cjZ&autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen"></iframe> */

const videolists = [
    {
        id: 1,
        nombre: 'Eminem',
        url: 'PLC0w3lEHx2SF3NsbnqnLbWBWyF_3g0cjZ'
    },
    {
        id: 2,
        nombre: 'Linkin Park',
        url: 'PL9LkJszkF_Z6bJ82689htd2wch-HVbzCO'
    },
    {
        id: 3,
        nombre: 'Queen',
        url: 'PLeoBVKHKNsGriWnBb7u2FrwRC-izVytZg'
    }
]

class Publicidad extends React.Component {
    constructor(props) {
        super(props);
    }

    /*  componentWillMount() {
         fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=PLC0w3lEHx2SF3NsbnqnLbWBWyF_3g0cjZ&key=[AIzaSyAa8yy0GdcGPHdtD083HiGGx_S0vMPScDM]' --header 'Authorization: Bearer [AIzaSyAa8yy0GdcGPHdtD083HiGGx_S0vMPScDM]' --header 'Accept: application/json' --compressed`)
             .then(res => res.json())
             .then((data) => {
                 console.log("Data de google es ")
                 console.log(data);
             })
     } */


    render() {
        var grids = [];
        for (let i = 0; i < videolists.length; i += 2) {
            if (typeof videolists[i + 1] != 'undefined') {
                grids.push(
                    <Grid container spacing={3} container justify="center">
                        <Grid item xs={6}>
                            <Paper style={gridHijo}>
                                <iframe style={iframeStyle} width="100%" height="100%" src={formarUrl(videolists[i].url)} frameborder="0" allow="autoplay; encrypted-media"></iframe>
                                <h2 className='item-focusable' style={{ textAlign: 'center', wordWrap: 'break-word' }} >{videolists[i].nombre}</h2>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper style={gridHijo}>
                                <iframe style={iframeStyle} width="100%" height="100%" src={formarUrl(videolists[i + 1].url)} frameborder="0" allow="autoplay; encrypted-media"></iframe>
                                <h2 className='item-focusable' style={{ textAlign: 'center', wordWrap: 'break-word' }} >{videolists[i + 1].nombre}</h2>
                            </Paper>
                        </Grid>
                    </Grid>
                )
            } else {
                grids.push(
                    <Grid container spacing={3} container justify="center">
                        <Grid item xs={6}>
                            <Paper style={gridHijo}>
                                <iframe style={iframeStyle} width="100%" height="100%" src={formarUrl(videolists[i].url)} frameborder="0" allow="autoplay; encrypted-media"></iframe>
                                <h2 className='item-focusable' style={{ textAlign: 'center', wordWrap: 'break-word' }} >{videolists[i].nombre}</h2>
                            </Paper>
                        </Grid>
                    </Grid>
                )
            }
        }

        return (
            <div style={gridPadre}>

                {grids}

            </div>
        )
    }
}

const gridPadre = {
    margin: '2%'
}

const gridHijo = {
    height: 270,
    width: 360,
    margin: 'auto',
    marginBottom: '50px'
}

const iframeStyle = {
    display: 'block'
}

function formarUrl(id) {
    return 'http://www.youtube.com/embed?listType=playlist&list=' + id + '&controls=0';
}

export default Publicidad;