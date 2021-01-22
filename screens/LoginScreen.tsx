import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import RegisterScreen from "./RegisterScreen";
import * as firebase from "firebase";
import SnackBar from "react-native-snackbar-component";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [snackvisible, setSnack] = React.useState(false);
  const [errorMessage, setSnackMessage] = React.useState("");

  const onPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ..
        console.log(user.email);
      })
      .catch((error) => {
        setSnack(true);
        setSnackMessage(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>GG APP</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="E-Mail Adresiniz"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Şifreniz..."
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="#003f5c"
          value={password}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={onPress}>
        <Text style={styles.loginText}>Giriş Yap</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton}>
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          GG APP Hesabın Yok mu? Kayıt Olmak için Tıkla
        </Text>
      </TouchableOpacity>
      <SnackBar
        visible={snackvisible}
        textMessage={errorMessage}
        actionHandler={() => {
          setSnack(false);
        }}
        actionText="Tamam"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  backButton: {
    marginTop: 15,
    height: 30,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});
