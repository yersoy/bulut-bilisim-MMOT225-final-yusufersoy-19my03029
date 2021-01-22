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

export default function ChatScreen({ navigation }) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState("");
  const onPress = () => {
    var myref = firebase.database().ref("news");
    myref.once("value", (snapshot) => {
      var length = snapshot.numChildren();
      return firebase
        .database()
        .ref("news/" + (length + 1))
        .set({
          title: title,
          content: content,
          image: image,
        });
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Oyun Adı"
          onChangeText={(text) => setTitle(text)}
          placeholderTextColor="#003f5c"
          value={title}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Oyun Açıklaması"
          onChangeText={(text) => setContent(text)}
          placeholderTextColor="#003f5c"
          value={content}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Oyun Resmi"
          onChangeText={(text) => setImage(text)}
          placeholderTextColor="#003f5c"
          value={image}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={onPress}>
        <Text style={styles.loginText}>Oyunu Ekle</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  
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
