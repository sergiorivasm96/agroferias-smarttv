import React from 'react'

class BotonOpcion extends React.Component{
    // constructor(props) {
    //     super(props);
    // }
    render (){
        return( 
            <div>
                <button className='item-focusable' style={{width:'200px', height:'50px', backgroundColor:'#ed217c', marginLeft: '45%', marginTop: '2%', color:'white', fontWeight: 'bold' }} onClick={this.props.funClick} >
                    {this.props.texto}
                </button>         
            </div>

        )
    }
}
export default BotonOpcion;