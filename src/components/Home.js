import { Player } from 'video-react'
import React from 'react'
import '../components/styles/Home.css'

function Home(props) {
    return (
        <Player 
        src='https://media.w3.org/2010/05/sintel/trailer_hd.mp4' 
        fluid = {false} 
        autoPlay = {true}
        width = {'100%'}
        height = {'100%'}
        className='Player'>
      </Player>
    );
}
  
export default Home;