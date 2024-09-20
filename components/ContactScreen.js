import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, ImageBackground } from 'react-native';

export default function ContactScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    fetch(`http://172.21.12.212/mobileapp/search.php?user_id=${searchTerm}`)
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
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <ImageBackground
          source={require('../assets/topVector.png')}
          style={styles.topImage}
        />
      </View>
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
            <Text style={styles.resultText}>Password: {item.passwd}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#F5F5F5", // ถ้าต้องการพื้นหลังเป็นสีฟ้าอ่อนแ
  },
  topImageContainer: {
    width: "100%",
    height: 200,
  },
  topImage: {
    width: "100%",
    height: "100%",
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    borderColor: "#A3C1DA",
    padding: 10,
    color: "#4A90E2",
  },
  resultContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#A3C1DA",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // ทำให้พื้นหลังของผลลัพธ์โปร่งใส
  },
  resultText: {
    color: "#262626",
  },
});
