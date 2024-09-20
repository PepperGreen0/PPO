import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, ImageBackground } from 'react-native';

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    fetch(`http://192.168.56.1/mobileapp/search.php?user_id=${searchTerm}`)
      .then((response) => response.json())
      .then((json) => {
        console.log('Search Results:', json);
        setResults(json);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <ImageBackground
      source={require('../assets/topVector.png')} // ใช้ภาพเป็นพื้นหลัง
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <TextInput
          placeholder="Enter User ID"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          style={styles.input}
        />
        <Button title="Search" onPress={handleSearch} color="#A3C1DA" />
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>ID: {item.id}</Text>
              <Text style={styles.resultText}>User ID: {item.user_id}</Text>
              <Text style={styles.resultText}>User Name: {item.user_name}</Text>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // ทำให้พื้นหลังโปร่งใส
    borderRadius: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    borderColor: '#A3C1DA',
    padding: 10,
    color: '#4A90E2',
  },
  resultContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#A3C1DA',
    backgroundColor: '#FFFFFF',
  },
  resultText: {
    color: '#262626',
  },
});
