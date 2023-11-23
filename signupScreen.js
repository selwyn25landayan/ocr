import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [emailPhone, setEmailPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateUsername = (text) => {
    setUsername(text);
  };

  const updateEmailPhone = (text) => {
    setEmailPhone(text);
  };

  const updatePassword = (text) => {
    setPassword(text);
  };

  const updateConfirmPassword = (text) => {
    setConfirmPassword(text);
  };

  const submitAction = () => {
    const finalUsername = username;
    const finalEmailPhone = emailPhone;
    const finalPassword = password;
    const confirmFinalPassword = confirmPassword;
    console.log(
      "Username: " +
        finalUsername +
        " | Email / Phone: " +
        finalEmailPhone +
        " | Password: " +
        finalPassword
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Sign Up</Text>
      <Text style={styles.defaultText}>Just some details to get you in!</Text>

      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor={"gray"}
          onChangeText={updateUsername}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email / Phone"
          placeholderTextColor={"gray"}
          onChangeText={updateEmailPhone}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor={"gray"}
          onChangeText={updatePassword}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          placeholderTextColor={"gray"}
          onChangeText={updateConfirmPassword}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity onPress={submitAction}>
        <Text style={styles.loginButton}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.lineDivider}></Text>

      <View style={styles.otherPlatforms}>
        <TouchableOpacity>
          <Icon name="google" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="facebook" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="telegram" size={40} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Login Screen")}>
        <Text style={styles.alreadyRegistered}>
          Already registered? Log in.
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242526",
  },

  loginText: {
    paddingTop: 150,
    paddingLeft: 50,
    fontSize: 40,
    color: "white",
  },

  defaultText: {
    paddingLeft: 50,
    paddingBottom: 20,
    fontSize: 15,
    color: "white",
  },

  textInput: {
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "white",
    marginHorizontal: 50,
    marginVertical: 5,
    color: "white",
    borderRadius: 10,
    height: 50,
  },

  loginButton: {
    marginHorizontal: 50,
    borderColor: "white",
    borderRadius: 10,
    padding: 10,
    color: "black",
    backgroundColor: "white",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    fontSize: 20,
    marginTop: 50,
    flexWrap: "wrap",
  },

  alreadyRegistered: {
    color: "white",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 50,
    textAlign: "center",
    paddingTop: 20,
  },

  lineDivider: {
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "white",
    marginHorizontal: 50,
  },

  otherPlatforms: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 50,
    borderColor: "white",
    marginTop: 30,
    justifyContent: "space-evenly",
    padding: 0,
    paddingHorizontal: 20,
    maxHeight: 50,
  },
});
