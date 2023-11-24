import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black", // Set the background color to black
    padding: 20,
  },
  title: {
    fontSize: 24,
    margin: 10,
    fontWeight: "bold",
    color: "white", // Set the font color to white
  },
  date: {
    fontSize: 16,
    marginBottom: 10,
    color: "white", // Set the font color to white
  },
  chartDateTitle: {
    fontSize: 24,
    margin: 10,
    marginLeft: 10,
    fontWeight: "bold",
    color: "white", // Set the font color to white
  },
  button: {
    backgroundColor: "transparent",
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
  },
  buttonImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  chartTitles: {
    marginLeft: 5,
  },

  /* Login Styles */
  loginText: {
    paddingTop: 200,
    fontSize: 40,
    color: "white",
    textAlign: 'center',
  },

  defaultText: {
    paddingBottom: 20,
    fontSize: 15,
    color: "white",
    textAlign: 'center',
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

  forgotPassword: {
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
    justifyContent: "space-between",
    padding: 0,
    paddingHorizontal: 50,
    maxHeight: 50,
  },

  /* History */
  card: {
    flexDirection: "row",
    width: 350,
    height: 130,
    backgroundColor: "#312f2f",
    borderRadius: 10,
    marginTop: 20,
  },
  cardImage: {
    width: 100,
    height: "100%",
    resizeMode: "contain",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginLeft: 10,
  },
  cardContent: {
    flex: 1,
    padding: 20,
  },
  cardTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginRight: 10,
  },
  cardIcon: {
    width: 20,
    height: 10,
    resizeMode: "contain",
    tintColor: "white",
  },
  label: {
    fontSize: 12,
    color: "white",
  },
  cardTextContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },

  searchBar: {
    width: 350,
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    padding: 10,
    borderColor: "gray",
    borderRadius: 5,
    color: "black",
    backgroundColor: "gray",
  },
});