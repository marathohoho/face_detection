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

 const initialState = {
  input: '',
  imageURL: '',
  box: {},
  routes: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
} 

class App extends Component {
  constructor(){
    super();
    this.state = initialState; 
  }

  onInputChage = (event) => {
    this.setState({input: event.target.value})
  }
  
  onSubmit = () => {
    const {input, user} = this.state;
    this.setState({imageURL: input});
    
    
    fetch(`http://localhost:4000/imageURL/${user.id}`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if(response){
          fetch(`http://localhost:4000/image/${user.id}`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(resp => resp.json())
            .then(user => {
              this.setState({user: user})
            })
            .catch(error => console.log(error)) // output error for updating rank count
        }
        this.displayBox(this.calculateBoxRegion(response))
      })
      .catch(err => console.log(err));// output error for inputting picture URL
    this.setState({
      input: ''
    });
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
      this.setState(initialState)
    else if (route === 'home')
      this.setState({isSignedIn: true})
    this.setState({routes: route})
  }

  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  render(){
    let {imageURL, box, routes, isSignedIn} = this.state;
    return (
      <div className="App">
        <Particles className='particles' params = {particlesjsconfig}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>   
        {routes === 'home'? 
          <div>
          {/* need to pass a user parameters */}
            <Rank name={this.state.user.name} entries = {this.state.user.entries}/> 
            <ImageInputForm 
              // onReset = {this.resetState}
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
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
              :
              <Register 
                onRouteChange={this.onRouteChange}
                loadUser = {this.loadUser}
              /> 
          )
        }
      </div>
    );
  }
}

export default App;
