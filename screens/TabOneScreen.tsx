import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import * as firebase from "firebase";
export default function TabOneScreen({ navigation }) {
  const [mydata, setMydata] = React.useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    var myref = firebase.database().ref("news");
    myref.once("value", function (snapshot) {
      var li = [];
      snapshot.forEach((child) => {
        li.push({
          id: child.key,
          title: child.val().title,
          content: child.val().content,
          image: child.val().image,
        });
      });
      setMydata(li);
      return console.log(li);
    });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DetailScreen", { item: item });
      }}
    >
      <View style={styles.row}>
        <Image source={{ uri: item.image }} style={styles.pic} />
        <View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">
              {item.title}
            </Text>
          </View>
          <View style={styles.msgContainer}>
            <Text style={styles.msgTxt}>{item.content}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={mydata}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ChatScreen");
        }}
        style={styles.fab}
      >
        <Text style={styles.fabIcon}>+</Text>
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
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#03A9F4",
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 50,
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
