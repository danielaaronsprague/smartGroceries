import * as React from 'react';
import {
  Picker,
  Text,
  Button,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { Body, Right, ListItem } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Autocomplete,
  withKeyboardAwareScrollView,
} from 'react-native-dropdown-autocomplete';
import shortid from 'shortid';
import { Ionicons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';

// const allItems = [{'apple': 'produce'}]
const allItems = [
  { name: 'bread', category: 'bakery', active: false },
  { name: 'eggs', category: 'dairy', active: true },
  { name: 'paper towels', category: 'paperGoods', active: true },
  { name: 'milk', category: 'dairy', active: true },
  { name: 'apples', category: 'produce', active: true },
  { name: 'broccoli', category: 'produce', active: true },
  { name: 'limes', category: 'produce', active: true },
  { name: 'tequila', category: 'alcohol', active: true },
  { name: 'beer', category: 'alcohol', active: true },
  { name: 'tylenol', category: 'pharmacy', active: true },
  { name: 'frozen corn', category: 'frozen', active: true },
  { name: 'hot sauce', category: 'dryGoods', active: true },
  { name: 'onions', category: 'produce', active: true },
  { name: 'cauliflour', category: 'produce', active: true },
  { name: 'cilantro', category: 'produce', active: true },
  { name: 'dill', category: 'produce', active: true },
  { name: 'oranges', category: 'produce', active: true },
  { name: 'lemons', category: 'produce', active: true },
];

function HomeScreen(props) {
  const [listItems, setList] = React.useState([]);
  const [itemDraft, modifyDraft] = React.useState('');
  const [category, setCategory] = React.useState('produce');
  const [order, setOrder] = React.useState([
    'produce',
    'bakery',
    'dairy',
    'booze',
    'paperGoods',
    'frozen',
    'dryGoods',
    'pharmacy',
    'random',
    'fridge',
  ]);

  function compare(a, b) {
    let aOrder = order.indexOf(a[Object.keys(a)[0]]);
    let bOrder = order.indexOf(b[Object.keys(b)[0]]);
    if (aOrder > bOrder) return 1;
    if (bOrder > aOrder) return -1;
    return 0;
  }
  async function addNewProduct(name, category) {
    setList([...listItems, { [name]: category }]);
    await AsyncStorage.setItem('@allItems', JSON.stringify(newProductsList));
    setList({
      listItems: newProductsList,
    });
  }
  function handleSelectItem(item, index) {
    const { onDropdownClose } = props;
    modifyDraft(item.name);
    setCategory(item.category);
    onDropdownClose();

    console.log(item);
  }
  const { scrollToInput, onDropdownClose, onDropdownShow } = props;
  return (
    <View style={styles.container}>
      <ListItem style={{ justifyContent: 'space-between' }}>
        {/* <TextInput
          placeholder="Add Item"
          onChangeText={(data) => {
            // let newDraft = itemDraft + data;
            modifyDraft(data);
          }}
          style={{ width: 100, height: 20, marginTop: 0 }}
          value={itemDraft}
          underlineColorAndroid="transparent"
        /> */}
        <Autocomplete
          key={shortid.generate()}
          style={styles.input}
          scrollToInput={(ev) => scrollToInput(ev)}
          handleSelectItem={(item, id) => handleSelectItem(item, id)}
          onDropdownClose={() => onDropdownClose()}
          onDropdownShow={() => onDropdownShow()}
          renderIcon={() => (
            <Ionicons
              name="ios-add-circle-outline"
              size={20}
              color="#c7c6c1"
              style={styles.plus}
            />
          )}
          onChangeText={(data) => {
            console.log(data);
            // modifyDraft(data);
          }}
          // noDataText={itemDraft}
          data={allItems}
          minimumCharactersCount={2}
          highlightText
          // placeholder={itemDraft}
          valueExtractor={(item) => item.name}
          rightContent
          rightTextExtractor={(item) => item.properties}
        />
        <Picker
          selectedValue={category}
          style={{
            height: 30,
            width: '50%',
            marginBottom: 190,
          }}
          onValueChange={(data) => {
            console.log(data);
            setCategory(data);
          }}
        >
          <Picker.Item label="Produce" value="produce" />
          <Picker.Item label="Bakery" value="bakery" />
          <Picker.Item label="Dairy" value="dairy" />
          <Picker.Item label="Paper Goods" value="paperGoods" />
          <Picker.Item label="Booze" value="booze" />
          <Picker.Item label="Forzen" value="frozen" />
          <Picker.Item label="Dry Goods" value="dryGoods" />
          <Picker.Item label="Pharmacy" value="pharmacy" />
          <Picker.Item label="Random" value="random" />
          <Picker.Item label="Fridge" value="fridge" />
        </Picker>
        {/* <View style={{ marginLef}}> */}
        <Button
          title="+"
          onPress={() => {
            modifyDraft('');
            itemDraft !== ''
              ? setList([...listItems, { [itemDraft]: category }])
              : setList(listItems);
          }}
        />
        {/* </View> */}
      </ListItem>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {listItems.sort(compare).map((item, index) => {
          let name = Object.keys(item)[0];
          let category = getCatColor(item[name]);
          console.log(itemDraft);
          const count = index;
          return (
            <ListItem key={count}>
              <Body>
                <Text style={{ color: '#000' }}>{`${category} ${name}`}</Text>
              </Body>
              <Right>{/* <CheckBox checked={p.gotten} /> */}</Right>
            </ListItem>
          );
        })}
      </ScrollView>
    </View>
  );
}

function getCatColor(category) {
  switch (category) {
    case 'produce':
      return '🥦';
    case 'dairy':
      return '🐮';
    case 'frozen':
      return '🧊';
    case 'fridge':
      return '🥶';
    case 'booze':
      return '🥃';
    case 'pharmacy':
      return '💊';
    case 'paperGoods':
      return '🧻';
    case 'bakery':
      return '🍞';
    case 'dryGoods':
      return '🍪';
    case 'random':
      return '🔪';
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

export default withKeyboardAwareScrollView(HomeScreen);

const styles = StyleSheet.create({
  plus: {
    position: 'absolute',
    left: 15,
    top: 10,
  },
  input: { maxHeight: 40 },
  button: {
    height: 10,
    width: 10,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#D0F1E7',
    marginTop: 0,
    paddingTop: 0,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
