import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userInfo,setUserInfo] = useState()

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  GoogleSignin.configure({
    webClientId: '629157552717-lhqe6npi9g8vsr00du207u6ukbco2067.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    console.log('playservice')
    const userInfo = await GoogleSignin.signIn();
    console.log("userinfo")
    setUserInfo(userInfo);
  } catch (error) {
    console.log(error,error.code)
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      //
    }
  }
};

async function onGoogleButtonPress() {
  try{
  // Get the users ID token
  console.log('sig')
  const  {idToken}  = await GoogleSignin.signIn();
  console.log('cred')
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);}
  catch(error){console.log(error.code,error)}
}

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide} 
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn} />
          <Button
            title="Google Sign-In"
            onPress={() => onGoogleButtonPress().then(() => console.log(' Try Signed in with Google!'))}
          />
      </View>
    );
  }



  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}
export default App;
