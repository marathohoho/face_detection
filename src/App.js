import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin.js';
import Register from './Components/Register/Register.js';
import ImageInputForm from './Components/ImageInputForm/ImageInputForm';
import Rank from './Components/Rank/Rank';
import particlesjsconfig from './particlesjs-config.json';
import Particles from 'react-particles-js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey: '9c1782e66ed240f187e280ef6f5357f5'
 });


class App extends Component {
  constructor(){
    super();
    this.state = this.getInitialState();  
  }

  onInputChage = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    this.setState({imageURL: this.state.input});
    this.setState({
      input: ''
    });

    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(response => this.displayBox(this.calculateBoxRegion(response)))
    .catch(err => console.log(err));// there was an error
    }

  onKeySubmit = (event) =>{
    if (event.keyCode === 13){
      this.onSubmit()
    }
  }

  calculateBoxRegion = (data) =>{
    const clarifaiFaceBoxData = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFaceBoxData.left_col * width,
      topRow: clarifaiFaceBoxData.top_row * height,
      rightCol: width - (clarifaiFaceBoxData.right_col * width),
      bottomRow: height - (clarifaiFaceBoxData.bottom_row * height)
    }

  }
 
  displayBox = (box) => {
    console.log(box)
    this.setState({box : box})
  }

  onRouteChange = (route) => {
    if (route === 'signout')
      this.setState({isSignedIn: false})
    else if (route === 'home')
      this.setState({isSignedIn: true})
    this.setState({routes: route})
  }

  getInitialState = () => {
    const initialState = {
      input: '',
      imageURL: '',
      box: {},
      routes: 'signin',
      isSignedIn: false
    };
    return initialState;
  }

  resetState = () => {
    this.setState(this.getInitialState());
  };
  
  render(){
    let {imageURL, box, routes, isSignedIn} = this.state;
    return (
      <div className="App">
        <Particles className='particles' params = {particlesjsconfig}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>   
        {routes === 'home'? 
          <div>
            <Rank/>
            <ImageInputForm 
              onReset = {this.resetState}
              onInputChange = {this.onInputChage} 
              onSubmit = {this.onSubmit} 
              onKeySubmit={this.onKeySubmit}
              />
            <FaceRecognition
              urlPassed={imageURL}
              box={box}
            />
          </div> 
          : (
            routes === 'signin' ? 
              <Signin onRouteChange={this.onRouteChange}/> 
              :
              <Register onRouteChange={this.onRouteChange}/> 
          )
        }
      </div>
    );
  }
}

export default App;
