import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Appbar, Card, Paragraph, Searchbar } from 'react-native-paper'
import { ScrollView } from 'react-native-web'

const App = () => {

  const [meals, setMeals] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  console.log(meals)
  const url = 'https://www.themealdb.com/api/json/v1/1/categories.php'

  const eatMeals = async function(){
    const response = await fetch(url)
    const data = await response.json()
    setMeals(data.categories)
  } 

  useEffect(()=>{
    eatMeals()
  }, [])

  const handleQuery = query =>{
    setSearchQuery(query)
  }

  return (
    <View>
      <Appbar style={styles.appBarStyle}>
        <Appbar.Content title= 'Recipe App' color='white'/>        
      </Appbar>
      <Searchbar
        placeholder='search here'
        value={searchQuery}
        onChangeText={handleQuery}
      />
      <ScrollView>
        {
          meals.map((meal)=>(
            <Card key={meal.idCategory} style={styles.fitWell}>
              <Card.Cover source={meal.strCategoryThumb}/>
              <Card.Title title ={meal.strCategory} />
              <Card.Content>
                <Paragraph>{meal.strCategoryDescription}</Paragraph>
              </Card.Content>
            </Card>
          ))
        }
      </ScrollView>    
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  appBarStyle:{
    backgroundColor: 'purple'
  },

  fitWell:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})