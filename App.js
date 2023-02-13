import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [image, setImage] = useState ('');
  const [recipes, setRecipes] = useState([]);
 
  //Haun tekevä funktio
  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json()) //Odotetaan vastausta ja muutetaan JSON-muotoon
    .then(responseJson => setRecipes(responseJson.meals)) //Taulukko, joka tulee vastauksena
    .catch(error => { 
        Alert.alert('Error', error); 
    });    
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      {/*Tekstinsyöttökenttä */}
      <TextInput style={styles.input} placeholder='ingredient' 
        onChangeText={text => setKeyword(text)}
        value={keyword} />
      
      {/*Button ja funktiokutsu */}
      <Button title="Find" onPress={getRecipes} />

      {/*Flatlist saadun tiedon näyttämiseen */}
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => 
          <View>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
            <Text style={{fontSize: 16 }}>{item.strMealThumb}</Text>
            <Image style= {styles.images} source={ item.strMealThumb}></Image>
          </View>}
        data={recipes} 
        ItemSeparatorComponent={listSeparator} /> 
    </View>
  );
}




const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
 },
 input : {
  marginTop: 100,
  width:200  , 
  height: 30,
  borderColor: 'gray', 
  borderWidth: 1
},
images: {
  width:250,
  height: 100
},


});