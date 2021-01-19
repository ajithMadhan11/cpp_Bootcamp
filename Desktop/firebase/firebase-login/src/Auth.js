import React ,{Component} from 'react';
import firebase from 'firebase';



var firebaseConfig = {
  apiKey: "AIzaSyD9y0n8ssY-96LLbKvXALi0MyGIdZ5WtSw",
  authDomain: "fir-login-10ffa.firebaseapp.com",
  projectId: "fir-login-10ffa",
  storageBucket: "fir-login-10ffa.appspot.com",
  messagingSenderId: "282815256990",
  appId: "1:282815256990:web:4b187b367dfcadc5a8de8f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
class Auth extends Component {

login(e){
  e.preventDefault();
  const email=this.email.value;
  const password=this.password.value;
  console.log(email,password);

var auth=firebase.auth();
const promise=auth.signInWithEmailAndPassword(email,password);

promise.catch(e=>{
  var err=e.message;
  this.setState({error:err});
  console.log(err)
});
}
SignUp(e){
  e.preventDefault();
  const email=this.email.value;
  const password=this.password.value;
  console.log(email,password);

  var auth=firebase.auth();
  const promise=auth.createUserWithEmailAndPassword(email,password);

  promise
  .then((user)=>{
    var err='Welcome'+user.user.email;
    console.log(err)
    firebase.database().ref('users/' + user.user.uid).set({
    email: user.user.email

 });
    this.setState({error:'Sucessfully Signed in'});
    console.log(user)
  });
promise
.catch(e=>{
  var err=e.message;
  this.setState({error:err});
  console.log(err)
});

}

constructor(props){
  super(props);

  this.state = {
    error:''
  };
  this.login = this.login.bind(this);
  this.SignUp = this.SignUp.bind(this);
}





  render(){
    return(
      <div>
      <h1>Firebase Authentication</h1>
        <input type="email" id="email" ref={e=>this.email=e} placeholder="enter your email"/> <br/>
        <input type="password" id="pass" ref={e=>this.password=e} placeholder="enter your password"/> <br/>
        <p>{this.state.error}</p>
        <button onClick={this.login}>Sign In</button>
        <button onClick={this.SignUp}>Sign Up</button>
        <button>Logout</button>
      </div>
    );
  }
}

export default Auth;
