import React, { useEffect, useState } from 'react'; 
import { FlatList, Text, View, Button, TouchableOpacity, ActivityIndicator, Alert, ImageBackground, StyleSheet } from 'react-native'; 

export default function JsonScreen({ navigation }) { 
  const [isLoading, setLoading] = useState(true); 
  const [data, setData] = useState([]); 
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => { 
    fetch('http://192.168.56.1/mobileapp/showmobile.php') 
      .then((response) => response.json()) 
      .then((json) => { 
        console.log('Data received:', json); 
        setData(json); 
      }) 
      .catch((error) => console.error('Error:', error)) 
      .finally(() => setLoading(false)); 
  }, []); 

  const handleEdit = (item) => {
    navigation.navigate('About', { item });
  };

  const handleDelete = (user_id) => {
    console.log('Deleting user_id:', user_id); 
    fetch(`http://192.168.56.1/mobileapp/dropdb.php?id=${encodeURIComponent(user_id)}`, {
      method: 'GET', 
    })
      .then((response) => response.text())
      .then((responseText) => {
        console.log('Response Text:', responseText);
        if (responseText.includes('Record deleted successfully')) {
          setData((prevData) => prevData.filter((item) => item.user_id !== user_id));
          Alert.alert('Success', 'Record deleted successfully');
        } else {
          Alert.alert('Error', responseText); 
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred');
      });
  };

  const toggleOptions = (id) => {
    setSelectedId(selectedId === id ? null : id); 
  };

  if (isLoading) { 
    return ( 
      <View style={styles.loadingContainer}> 
        <ActivityIndicator size="large" color="#0000ff" /> 
        <Text>Loading...</Text> 
      </View> 
    ); 
  } 

  if (data.length === 0) { 
    return ( 
      <View style={styles.loadingContainer}> 
        <Text>No data available</Text> 
      </View> 
    ); 
  } 

  return ( 
    <ImageBackground
      source={require('../assets/topVector.png')} // ใช้ภาพเป็นพื้นหลัง
      style={styles.container}
    >
      <FlatList 
        data={data} 
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => ( 
          <View style={styles.itemContainer}> 
            <TouchableOpacity onPress={() => toggleOptions(item.id)}>
              <Text>ID: {item.id}</Text> 
              <Text>User ID: {item.user_id}</Text> 
              <Text>User Name: {item.user_name}</Text> 
              <Text>Password: {item.passwd}</Text>
            </TouchableOpacity>

            {selectedId === item.id && (
              <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={() => handleEdit(item)} />
                <Button title="Delete" onPress={() => handleDelete(item.user_id)} color="red" />
              </View>
            )}
          </View> 
        )} 
      /> 
    </ImageBackground>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // ทำให้พื้นหลังโปร่งใส
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
