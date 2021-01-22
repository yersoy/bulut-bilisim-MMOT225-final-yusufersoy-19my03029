import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import * as firebase from "firebase";
import AuthSwitcher from "./screens/AuthSwitcher";

export default function App() {
  const [user, setUser] = React.useState(false);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const firebaseConfig = {
    apiKey: "AIzaSyAFCXDSkHTqpX7XPbbcbmjaqQFFNgg0Gcc",
    authDomain: "mmot-final.firebaseapp.com",
    projectId: "mmot-final",
    storageBucket: "mmot-final.appspot.com",
    databaseURL: "https://mmot-final-default-rtdb.europe-west1.firebasedatabase.app",
    messagingSenderId: "264747089446",
    appId: "1:264747089446:web:26692fa2fa24bc5d4df0e7",
    measurementId: "G-EX53289GML",
  };

  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error("Firebase initialization error", err.stack);
    }
  }
  if (!isLoadingComplete) {
    return null;
  } else {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        console.log("değişti");
        // ...
      } else {
        setUser(false);
      }
    });
    if (user) {
      return (
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      );
    } else {
      return <AuthSwitcher />;
    }
  }
}
