import * as WebBrowser from "expo-web-browser";
import { AsyncStorage } from "react-native";
import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

import {
  Body,
  Container,
  Content,
  Right,
  Text,
  CheckBox,
  List,
  ListItem,
  Fab,
  Icon,
} from "native-base";

import { ScrollView } from "react-native-gesture-handler";

import { MonoText } from "../components/StyledText";

// const listItems = [
//   { id: 1, name: "bread", category: "bakery" },
//   { id: 2, name: "eggs", category: "dairy" },
//   { id: 3, name: "paper towels", category: "paper-goods" },
//   { id: 4, name: "milk", category: "dairy" },
//   { id: 5, name: "apples", category: "produce" },
//   { id: 6, name: "broccoli", category: "produce" },
//   { id: 7, name: "limes", category: "produce" },
//   { id: 8, name: "tequila", category: "alcohol" },
//   { id: 9, name: "beer", category: "fridge" },
//   { id: 10, name: "tylenol", category: "pharmacy" },
//   { id: 11, name: "frozen corn", category: "frozen" },
//   { id: 12, name: "hot sauce", category: "random" },
// ];

export default function HomeScreen() {
  const [listItems, setList] = React.useState([
    { name: "bread", category: "bakery", active: true },
    { name: "eggs", category: "dairy", active: true },
    { name: "paper towels", category: "paperGoods", active: true },
    { name: "milk", category: "dairy", active: true },
    { name: "apples", category: "produce", active: true },
    { name: "broccoli", category: "produce", active: true },
    { name: "limes", category: "produce", active: true },
    { name: "tequila", category: "alcohol", active: true },
    { name: "beer", category: "alcohol", active: true },
    { name: "tylenol", category: "pharmacy", active: true },
    { name: "frozen corn", category: "frozen", active: true },
    { name: "hot sauce", category: "dryGoods", active: true },
    { name: "onions", category: "produce", active: true },
    { name: "cauliflour", category: "produce", active: true },
    { name: "cilantro", category: "produce", active: true },
    { name: "dill", category: "produce", active: true },
    { name: "oranges", category: "produce", active: true },
    { name: "lemons", category: "produce", active: true },
  ]);

  const [order, setOrder] = React.useState({
    produce: 1,
    bakery: 2,
    dairy: 3,
    alcohol: 4,
    paperGoods: 5,
    frozen: 6,
    dryGoods: 7,
    pharmacy: 8,
    random: 9,
  });

  function compare(a, b) {
    if (order[a.category] > order[b.category]) return 1;
    if (order[b.category] > order[a.category]) return -1;

    return 0;
  }

  async function addNewProduct(name, category = "produce") {
    const newProductsList = listItems.concat({
      name: name,
      category: category,
    });

    await AsyncStorage.setItem("@allItems", JSON.stringify(newProductsList));

    setList({
      listItems: newProductsList,
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <List>
          <TextInput
            placeholder='Add Item'
            onChangeText={(data) => this.setState({ textInput_Holder: data })}
            style={styles.textInputStyle}
            underlineColorAndroid='transparent'
          />
          {listItems.sort(compare).map((p) => {
            return (
              <ListItem key={p.name}>
                <Body>
                  <Text style={{ color: !p.active ? "#bbb" : "#000" }}>
                    {getCatColor(p.category)} {p.name}
                  </Text>
                </Body>
                <Right>
                  <CheckBox checked={p.gotten} />
                </Right>
              </ListItem>
            );
          })}
        </List>

        {/* <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <DevelopmentModeNotice />

          <Text style={styles.getStartedText}>Open up the code for this screen:</Text>

          <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <MonoText>screens/HomeScreen.js</MonoText>
          </View>

          <Text style={styles.getStartedText}>
            Change any of the text, save the file, and your app will automatically reload.
          </Text>
        </View> */}

        {/* <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>
              Help, it didn’t automatically reload!
            </Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>

      {/* <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          This is a tab bar. You can edit it in:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}
        >
          <MonoText style={styles.codeHighlightText}>
            navigation/BottomTabNavigator.js
          </MonoText>
        </View>
      </View> */}
    </View>
  );
}

function getCatColor(category) {
  switch (category) {
    case "produce":
      return "🥦";
    case "dairy":
      return "🐮";
    case "frozen":
      return "🧊";
    case "fridge":
      return "🥶";
    case "alcohol":
      return "🥃";
    case "pharmacy":
      return "💊";
    case "paperGoods":
      return "🧻";
    case "bakery":
      return "🍞";
    case "dryGoods":
      return "🍪";
    case "random":
      return "🔪";
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

// function handleLearnMorePress() {
//   WebBrowser.openBrowserAsync(
//     "https://docs.expo.io/versions/latest/workflow/development-mode/"
//   );
// }

// function handleHelpPress() {
//   WebBrowser.openBrowserAsync(
//     "https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change"
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D0F1E7",
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center",
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
