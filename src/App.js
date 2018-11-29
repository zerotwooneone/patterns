import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div >        
        <Hello></Hello>
      </div>
    );
  }
}

class Hello extends React.Component {
	constructor(){
  	super();
  	this.state = {
      count: 800,
      tp: 2,
      fps: 60,
      cpf: 10,
      curColor: -10000
    }
  }
  state = { }
  onCountChange(e) {
  	const intValue = parseInt(e.target.value);
  	this.setState({ count: intValue >= 0 ? intValue : 0 });
  }
  
  onTpChange(e) {
  	const intValue = parseFloat(e.target.value);
  	this.setState({ tp: intValue >= 0 ? (intValue) : 0 });
  }
  
  getDots() {
    const result = [];
    const containerWidth = 800;
    const center = containerWidth/2;
    for(let i=0; i<this.state.count; i++){
      result.push(
        <Dot key={i}
          x={center+(Math.cos(this.getAngle(i))*(i/2))}
          y={center+(Math.sin(this.getAngle(i))*(i/2))}
          colorId={i}
          colorOffset={this.state.curColor}          
          ></Dot>);          
    }
    return result;
  }
  
  getAngle(index){
    return (this.state.tp) * index;
  }

  componentDidMount() {
    this.onStart();
  }

  componentWillUnmount() {
    this.onStop();
  }
  
  onStart(){
  	const intervalId =
    	setInterval(q=>
      	this.setState((previousState, currentProps) =>
        ({ 
    			tp: previousState.tp+0.0001,
          curColor: previousState.curColor+
          	previousState.cpf
        })), (1000/this.state.fps));
    this.setState({intervalId: intervalId});
  }

	onStop(){
  	clearInterval(this.state.intervalId);
  }
  
  render() {
  	const { 
    	count,
      tp
    } = this.state;
    return (
      <div className="container">
        <div className="inputs">
          <input value={count} 
            onChange={this.onCountChange.bind(this)}
            placeholder="count"/>
          <input value={tp}
            placeholder="turns per"
            onChange={this.onTpChange.bind(this)}/>
          <input type="button"
            value="start"
            onClick={this.onStart.bind(this)}/>
          <input type="button"
            value="stop"
            onClick={this.onStop.bind(this)}/>
        </div>
        <div>
          {this.getDots()}
        </div>        
      </div>
    );
  }
}

class Dot extends React.Component {
  state = { };
  getHexColor(number){
    return "#"+((number)>>>0).toString(16).slice(-6);
	}
  render() {
  	return (
      <div className="dot"
        style={{
        	left: this.props.x,
          top: this.props.y,
          'backgroundColor': this.getHexColor(this.props.colorId + this.props.colorOffset)
        }}>
      </div>
    );
  }
}

export default App;
