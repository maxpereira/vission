import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
 
class Login extends React.Component{
 
  constructor (props, context) {
    super(props, context);
  }
 
  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var access_token = {accessToken: id_token};
    var returnedIdToken;
    console.log(access_token);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+access_token.accessToken);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      //console.log('Signed in as: ' + xhr.responseText);
      returnedIdToken = JSON.parse(xhr.responseText);
      console.log(returnedIdToken.name);
      console.log(returnedIdToken.email);
      localStorage.setItem('username', JSON.stringify(returnedIdToken.name));
    };
    xhr.send();
    //console.log(returnedIdToken.name);
    //console.log({accessToken: id_token});
    console.log('DAMN BOI HE THICC');
    
    //console.log(googleUser);
    }
 
  render () {
    return (
      <div>
        <GoogleLogin socialId="396611738669-gopcniqlfh179th8ftim2haab1v9lk6p.apps.googleusercontent.com"
                     className="google-login"
                     scope="profile"
                     fetchBasicProfile={true}
                     responseHandler={this.responseGoogle}
                     buttonText="Login"/>
      </div>
    );
  }
 
}
 
export default Login;