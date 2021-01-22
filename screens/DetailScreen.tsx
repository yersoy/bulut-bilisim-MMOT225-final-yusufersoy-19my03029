import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import RegisterScreen from "./RegisterScreen";
import * as firebase from "firebase";
import SnackBar from "react-native-snackbar-component";

export default function DetailScreen({ route, navigation }) {
  const { item } = route.params;
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState("");
  // const onPress = () => {
  //   var myref = firebase.database().ref("news");
  //   myref.once("value", (snapshot) => {
  //     var length = snapshot.numChildren();
  //     return firebase
  //       .database()
  //       .ref("news/" + (length + 1))
  //       .set({
  //         title: title,
  //         content: content,
  //         image: image,
  //       });
  //   });
  // };
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={{ width: 400, height: 400 }} />
      <Text>{item.title}</Text>
      <Text>{item.content}</Text>
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
  pic: {
    borderRadius: 5,
    height: "90%",
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
