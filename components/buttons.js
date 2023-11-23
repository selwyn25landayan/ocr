import { Image } from "react-native-svg";

// Import your PNG images here
import mapIcon from "./icons/navigation.png";
import searchIcon from "./icons/search.png";
import dashboardIcon from "./icons/layout.png";
import userIcon from "./icons/user.png";

export const handleButtonPress = (buttonText) => {
  // Handle button press here
  console.log(`Button pressed: ${buttonText}`);
  setSelectedButton(buttonText); // Update the selected button state
};

// Function to render the button icon based on the selected button
export const renderButtonIcon = (buttonText) => {
  switch (buttonText) {
    case "Button 1":
      return <Image source={mapIcon} style={styles.buttonIcon} />;
    case "Button 2":
      return <Image source={searchIcon} style={styles.buttonIcon} />;
    case "Button 3":
      return <Image source={dashboardIcon} style={styles.buttonIcon} />;
    case "Button 4":
      return <Image source={userIcon} style={styles.buttonIcon} />;
    default:
      return null;
  }
};
