import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

const API_ENDPOINT = "http://192.168.1.152:5000"

export default function App() {
  const [cookSessionId, setCookSessionId] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleStartCookSession = () => {
    fetch(`${API_ENDPOINT}/start_cook_session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cook_session_id: cookSessionId })
    })
      .then(response => response.json())
      .then(data => setResponseData(data))
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Cook Session ID:</Text>
      <TextInput
        style={styles.input}
        value={cookSessionId}
        onChangeText={setCookSessionId}
      />
      <Button title="Start Cook Session" onPress={handleStartCookSession} />
      {responseData && (
        <Text style={styles.response}>
          Cook session ID: {responseData.cook_session_id}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  },
  response: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

