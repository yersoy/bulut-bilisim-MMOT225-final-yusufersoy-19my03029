import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import SnackBar from "react-native-snackbar-component";
export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [snackvisible2, setSnack2] = React.useState(false);
  const [errorMessage2, setSnackMessage2] = React.useState("");
  function writeUserData(userId, name, email) {
    return firebase
      .database()
      .ref("users/" + userId)
      .set({
        username: name,
        email: email,
      });
  }
  const onPress = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;

        user
          .updateProfile({
            displayName: username,
          })
          .then(function () {
            setSnack2(true);
            setSnackMessage2("Kayıt Başarılı " + username);
            writeUserData(user.uid, user.displayName, user.email);
          })
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            setSnack2(true);
            setSnackMessage2(errorMessage);
          });
      })
      .catch((error) => {
        setSnack2(true);
        setSnackMessage2(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>GG APP</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="E-Mail"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Şifre"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="İsim Soyisim"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText} onPress={onPress}>
          Kayıt Ol
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.loginText}>
          Hesabın Var mı ? Giriş Yapmak için tıklaa
        </Text>
      </TouchableOpacity>
      <SnackBar
        visible={snackvisible2}
        actionHandler={() => {
          setSnack2(false);
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
  backButton: {
    marginTop: 25,
    height: 30,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
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
