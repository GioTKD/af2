import React, { Component } from 'react';
import styled from 'styled-components';
import "./AddDesign.css"

class UploadSTL extends Component{

  constructor({changeFile}){
    super();
    this.state = {file : undefined, photo: undefined, Taur: undefined, Taup: undefined, Component: undefined};
    this.changeFile = changeFile;
  } 
  
	onChange(event) {
    if(event.target.files[0] === undefined) return;
    let reader = new FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onload = () => {
      this.setState({file : reader.result});
    }
    let reader2 = new FileReader();
    reader2.readAsDataURL(event.target.files[0]);
    reader2.onload = () => {
      this.changeFile(reader2.result);
    }
  }

  getFrame() {
    if(!this.state.file) {
      alert('Carica un STL prima di fare una foto!');
      return;
    }
    let canvas = document.getElementsByTagName("canvas")[0];
    this.setState({photo: canvas.toDataURL()});
  }

  async submitForm(event) {
    if(!this.state.photo || !this.state.file) {
      alert('Carica un STL e fai una foto prima di Annunciare!');
      return;
    }
  }

	render() {
		return(
      <div>
            <label>
				<input type="file" name="inputSTL" onChange={(event) => this.onChange(event)}/>
            
            </label>	

        <img src={this.state.photo}/>
			</div>
		)
	}
}

export default UploadSTL;
