import React from 'react'
import { Link } from 'react-router-dom'

var imagenDefecto = "https://static.wixstatic.com/media/ca3438_2cc551f6cabf476084231941597fab24~mv2_d_1250_1559_s_2.png/v1/fit/w_2500,h_1330,al_c/ca3438_2cc551f6cabf476084231941597fab24~mv2_d_1250_1559_s_2.png"

class ScrollableListItem extends React.Component {

  cambioVideoList(videoList) {
    this.props.cambioVideoList(videoList);
  }
  render() {
    return (
      <div style={styleVideoList}>
        {this.props.videoList.map((videoList) => {
          if (videoList.urlPlaylist[0] !== 'P' && videoList.urlPlaylist[1] !== 'L') {
            videoList.urlPlaylist = 'error';
          }
          return (
            <Link to={{ pathname: `/playvideo/${videoList.urlPlaylist}` }}
              className='item-focusable feria configuration item' key={'feria-' + videoList.idPlaylist} onClick={() => this.cambioVideoList(videoList)} tabIndex="0" style={styleVideoListCard}>
              <div >
                <img name={"video-" + videoList.idPlaylist.toString()} src={videoList.urlImagen ? videoList.urlImagen : imagenDefecto} style={{ width: '150px', height: '150px' }} alt=""></img>
              </div>
              <div className={"videolist-text"} style={{ fontWeight: 'bold', color: 'white' }}>{videoList.nombre}</div>
            </Link>
          )
        })}
      </div>
    )
  }
}

export default ScrollableListItem;

const styleVideoList = {
  display: 'flex',
  marginTop: '5%',
  marginRight: '10%',
  whiteSpace: 'nowrap',
  overflow: 'auto',
  flexBasis: '25%',
  flexGrow: '1'
}

const styleVideoListCard = {
  textAlign: 'center',
  width: '100% !important',
  height: '100% !important',
  marginRight: '10%',
  textDecoration: 'none',
  color: 'black'
}