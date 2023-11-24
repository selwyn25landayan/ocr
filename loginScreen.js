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
import { auth, signInWithEmailAndPassword } from './firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const dimensions = useWindowDimensions();

  const updateEmail = (text) => {
    setEmail(text);
  };

  const updatePassword = (text) => {
    setPassword(text);
  };

  const submitAction = () => {
    if (!email || !password) {
      setModalMessage("Please fill out both email and password.");
      setIsModalVisible(true);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        navigation.navigate('DashboardScreen'); // Adjust as necessary
      })
      .catch((error) => {
        let errorMessage = "Login Failed";
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
          errorMessage = "Email and password do not match or user does not exist.";
        }
        setModalMessage(errorMessage);
        setIsModalVisible(true);
      });
  };

  const ModalComponent = ({ isVisible, message, onClose }) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={onClose}
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
      <Text style={[styles.loginText, { fontSize: dimensions.width * 0.1 }]}>Login</Text>
      <Text style={[styles.defaultText, { fontSize: dimensions.width * 0.04 }]}>
        Glad you're back!
      </Text>

      <View>
        <TextInput
          style={[styles.textInput, { marginHorizontal: dimensions.width * 0.1 }]}
          placeholder='Email'
          placeholderTextColor={'gray'}
          onChangeText={updateEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.textInput, { marginHorizontal: dimensions.width * 0.1 }]}
          placeholder='Password'
          placeholderTextColor={'gray'}
          onChangeText={updatePassword}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity onPress={submitAction}>
        <Text style={[styles.loginButton, { marginHorizontal: dimensions.width * 0.1 }]}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.lineDivider}></Text>

      <View style={styles.otherPlatforms}>
        <TouchableOpacity>
          <Icon name='google' size={40} color='white' />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name='facebook' size={40} color='white' />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name='apple' size={40} color='white' />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.forgotPassword}>Don't have an account? Sign up.</Text>
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
  forgotPassword: {
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
