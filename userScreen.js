import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Pressable, useWindowDimensions, TextInput } from 'react-native';

import ButtonImage1 from "./icons/scan.png";
import ButtonImage2 from "./icons/search.png";
import ButtonImage3 from "./icons/dashboard.png";
import ButtonImage4 from "./icons/user.png"; // This can be the user profile icon

export default function UserProfileScreen({ navigation }) {
  const { width: screenWidth } = useWindowDimensions();

  // State variables for editable profile information
  const [editableName, setEditableName] = useState("John Doe");
  const [isEditingName, setIsEditingName] = useState(false);

  const handleButtonPress = (buttonText) => {
    if (buttonText === 'Button 1') {
      navigation.navigate('OCR', { activateCamera: true });
    }
  };

  const handleLogout = () => {
    // Logic to handle user logout
    console.log('User logged out');
    // Typically you would navigate to a login screen
    // navigation.navigate('LoginScreen');
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    // Logic to save the edited name
    setIsEditingName(false);
    // Typically, you would send a request to update the user's name on the server
  };

  return (
    <View style={styles.container}>
      <View style={[styles.profileCard, { width: screenWidth * 0.9 }]}>
        <Image style={styles.profileImage} source={ButtonImage4} />
        <View style={styles.profileContent}>
          {isEditingName ? (
            <TextInput
              style={styles.editableName}
              value={editableName}
              onChangeText={(text) => setEditableName(text)}
            />
          ) : (
            <Text style={styles.profileName}>{editableName}</Text>
          )}
          {isEditingName ? (
            <Pressable style={styles.saveButton} onPress={handleSaveName}>
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.editButton} onPress={handleNameEdit}>
              <Text style={styles.editButtonText}>Edit</Text>
            </Pressable>
          )}
          <Text style={styles.profileLabel}>@johndoe</Text>
          {/* Other profile details */}
        </View>
      </View>
      
       {/* Logout Button */}
       <Pressable
        style={[styles.buttonStyle, { padding: screenWidth * 0.02, marginBottom: 20 }]}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={styles.buttonContainer}>
          {/* Button views */}
          <Pressable
            style={[styles.buttonStyle, { padding: screenWidth * 0.02 }]}
            onPress={() => handleButtonPress("Button 1")}
          >
            <Image
              source={ButtonImage1}
              style={[styles.buttonImage, { width: 30, height: 30 }]}
              resizeMode="contain"
            />
          </Pressable>

          <Pressable
            style={[styles.buttonStyle, { padding: screenWidth * 0.02 }]}
            onPress={() => navigation.navigate("HistoryScreen")}
          >
            <Image
              source={ButtonImage2}
              style={[styles.buttonImage, { width: 30, height: 30 }]}
              resizeMode="contain"
            />
          </Pressable>

          <Pressable
            style={[styles.buttonStyle, { padding: screenWidth * 0.02 }]}
            onPress={() => navigation.navigate("DashboardScreen")}
          >
            <Image
              source={ButtonImage3}
              style={[styles.buttonImage, { width: 30, height: 30 }]}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable
            style={[styles.buttonStyle, { padding: screenWidth * 0.02 }]}
            onPress={() => navigation.navigate("UserScreen")}
          >
            <Image
              source={ButtonImage4}
              style={[styles.buttonImage, { width: 30, height: 30 }]}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>

     

      {/* Other components or buttons as needed for the user profile */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
  },
  profileCard: {
    flexDirection: 'row',
    height: 130,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  editableName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  editButton: {
    backgroundColor: 'gray',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  editButtonText: {
    color: 'white',
  },
  saveButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  saveButtonText: {
    color: 'white',
  },
  profileLabel: {
    fontSize: 16,
    color: 'grey',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "gray",
    borderRadius: 5,
  },
  buttonImage: {
    resizeMode: "contain",
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
  },
});
