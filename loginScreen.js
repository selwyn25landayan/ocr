import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./components/style";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateUsername = (text) => {
    setUsername(text);
  };

  const updatePassword = (text) => {
    setPassword(text);
  };

  const submitAction = () => {
    const finalUsername = username; // Declare the variable here
    const finalPassword = password; // Declare the variable here
    console.log("Username: " + finalUsername + " | Password: " + finalPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      <Text style={styles.defaultText}>Glad you're back!</Text>

      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor={"gray"}
          onChangeText={updateUsername}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor={"gray"}
          onChangeText={updatePassword}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Dashboard Screen")}>
        <Text style={styles.loginButton}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
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

      <TouchableOpacity onPress={() => navigation.navigate("Sign Up Screen")}>
        <Text style={styles.forgotPassword}>
          Don't have an account? Sign up.
        </Text>
      </TouchableOpacity>
    </View>
  );
}
