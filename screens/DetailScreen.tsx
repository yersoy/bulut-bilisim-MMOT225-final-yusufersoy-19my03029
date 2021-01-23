import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import RegisterScreen from "./RegisterScreen";
import * as firebase from "firebase";
import SnackBar from "react-native-snackbar-component";
import { Card, ListItem, Button, Icon, Input } from "react-native-elements";

export default function DetailScreen({ route, navigation }) {
  const { item } = route.params;
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState("");
  const [postcomment, setComment] = React.useState("");

  return (
    <ScrollView>
      <Card>
        <Card.Title>{item.title}</Card.Title>
        <Card.Divider />
        <Card.Image source={{ uri: item.image }}></Card.Image>
        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>{item.newscontent}</Text>
        <Card.Divider />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text>
              <Icon
                raised
                name="thumbs-up"
                type="font-awesome"
                color="#f50"
                onPress={() => {
                  var myref = firebase.database().ref("news/" + item.id);
                  myref.update({
                    likes: item.likes + 1,
                  });
                  
                  alert(
                    "Başarıyla Beğendiniz . Beğeniniz Uygulamayı Yeniden Başlattıktan sonra görünecektir."
                  );
                }}
              />
            </Text>
            <Text>{item.likes} Beğeni</Text>
          </View>
        </View>
      </Card>
      <Card>
        <TextInput
          placeholder=" Yorumunu yaz.."
          style={{ height: 50 }}
          value={postcomment}
          onChangeText={(text) => setComment(text)}
        />
        <Button
          title="Habere Yorum Yap"
          onPress={() => {
            var myref = firebase
              .database()
              .ref("news/" + item.id + "/comments/");
            myref.once("value", (snapshot) => {
              var length = snapshot.numChildren();
              var user = firebase.auth().currentUser;
              firebase
                .database()
                .ref("news/" + item.id + "/comments/" + (length + 1))
                .set({
                  comment: postcomment,
                  image:
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                  name: user.displayName,
                });
                
              alert(
                "Yorum Başarıyla Yapıldı. Yeniden Başlatınca Gözükecektir."
              );
            });
          }}
        />
      </Card>
      <Card>
        <Card.Title>Yorumlar</Card.Title>
        <Card.Divider />

        {item.comments != null ? (
          item.comments.map((u, i) => {
            return (
              <TouchableOpacity>
                <View style={styles.row}>
                  <Image source={{ uri: u.image }} style={styles.pic} />
                  <View>
                    <View style={styles.nameContainer}>
                      <Text
                        style={styles.nameTxt}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {u.name}
                      </Text>
                    </View>
                    <View style={styles.msgContainer}>
                      <Text style={styles.msgTxt}>{u.comment}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={{ textAlign: "center" }}>Henüz Yorum Yapılmamış</Text>
        )}
      </Card>
    </ScrollView>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DCDCDC",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 10,
    width: "100%",
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
    fontSize: 18,
    width: "90%",
  },

  mblTxt: {
    fontWeight: "200",
    color: "#777",
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  msgTxt: {
    fontWeight: "400",
    color: "#008B8B",
    fontSize: 12,
    marginLeft: 15,
    width: "88%",
  },
});
