import React, { Component } from 'react';
import { StlViewer } from 'react-stl-file-viewer';

class StlRenderer extends Component{
    
    render(){

        const style= {
            margin: "auto"
        }

        return (
        
            <div style={{'width': '380px','height':'240px', 'margin':'auto' }}>
            <StlViewer 
                width={380}
                height={240} 
                url={this.props.file}
                groundColor='white'
                objectColor='rgb(50, 255, 255)'
                skyboxColor='white'
                gridLineColor='white'
                lightColor='white'
                volume={(val) => {this.setState({volume:val})}}
            /> 
        </div>
        )
    }
}

export default StlRenderer;