import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, createUserWithEmailAndPassword } from './firebaseConfig';

export default function SignUpScreen({ navigation }) {
  const [emailPhone, setEmailPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [signUpSuccessful, setSignUpSuccessful] = useState(false);
  const dimensions = useWindowDimensions();

  const submitAction = () => {
    if (!emailPhone || !password || !confirmPassword) {
      setModalMessage("Please fill in all fields.");
      setIsModalVisible(true);
      return;
    }
    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match.");
      setIsModalVisible(true);
      return;
    }
  
    createUserWithEmailAndPassword(auth, emailPhone, password)
      .then((userCredentials) => {
        setModalMessage("Sign up successful!");
        setSignUpSuccessful(true);
        setIsModalVisible(true);
      })
      .catch((error) => {
        let errorMessage = error.message;
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = "The email already exists. Try another email.";
        }
        setModalMessage(errorMessage);
        setIsModalVisible(true);
      });
  };

  const ModalComponent = ({ isVisible, message, onClose }) => {
    const handleModalClose = () => {
      onClose();
      if (signUpSuccessful) {
        navigation.navigate('LoginScreen');
      }
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={handleModalClose}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={[styles.container, { padding: dimensions.width * 0.05 }]}>
      <Text style={[styles.loginText, { fontSize: dimensions.width * 0.1 }]}>
        Sign Up
      </Text>
      <Text style={[styles.defaultText, { fontSize: dimensions.width * 0.04 }]}>
        Just some details to get you in!
      </Text>

      <View>
        <TextInput
          style={[styles.textInput, { marginHorizontal: dimensions.width * 0.1 }]}
          placeholder="Email / Phone"
          placeholderTextColor={"gray"}
          onChangeText={setEmailPhone}
        />
        <TextInput
          style={[styles.textInput, { marginHorizontal: dimensions.width * 0.1 }]}
          placeholder="Password"
          placeholderTextColor={"gray"}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TextInput
          style={[styles.textInput, { marginHorizontal: dimensions.width * 0.1 }]}
          placeholder="Confirm Password"
          placeholderTextColor={"gray"}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity onPress={submitAction}>
        <Text style={[styles.loginButton, { marginHorizontal: dimensions.width * 0.1 }]}>
          Sign Up
        </Text>
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
          <Icon name="apple" size={40} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.alreadyRegistered}>
          Already registered? Log in.
        </Text>
      </TouchableOpacity>

      <ModalComponent 
        isVisible={isModalVisible} 
        message={modalMessage} 
        onClose={() => setIsModalVisible(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242526',
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    marginTop: '15%',
  },
  defaultText: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  textInput: {
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 5,
    color: 'white',
    borderRadius: 10,
    height: 50,
  },
  loginButton: {
    borderColor: 'white',
    borderRadius: 10,
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 25,
  },
  lineDivider: {
    borderBottomWidth: 1,
    borderColor: 'white',
    marginTop: 20,
  },
  otherPlatforms: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-evenly',
    width: '80%',
    alignSelf: 'center',
  },
  alreadyRegistered: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
