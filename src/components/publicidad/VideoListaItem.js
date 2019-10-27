import React from 'react'
import { Link } from 'react-router-dom'

class ScrollableListItem extends React.Component {

  cambioVideoList(videoList) {
    this.props.cambioVideoList(videoList);
  }
  render() {
    return (
      <div style={styleVideoList}>
        {this.props.videoList.filter(x => {
          if (x.habilitado) return x;
        }).map((videoList) => (
          <Link to={{ pathname: `/playvideo/${videoList.urlPlaylist}` }}
            className='item-focusable feria item' key={'feria-' + videoList.idPlaylist} onClick={() => this.cambioVideoList(videoList)} tabIndex="0" style={styleVideoListCard}>
            <div >
              <img src={videoList.urlImagen} style={{ width: '150px', height: '150px' }} alt=""></img>
            </div>
            <div className={"videolist-text"} style={{ fontWeight: 'bold' }}>{videoList.nombre}</div>
          </Link>
        ))}
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
  marginRight: '10%'
}