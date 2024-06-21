import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";

const PostPetScreen = () => {
  const [picture, setPicture] = useState('');
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    // Here you would typically handle the form submission,
    // for example, by sending the data to your database.
    console.log({ picture, name, breed, age, size, gender, location, description });
  };

  return (
    <View style={styles.container}>
      <AppHeader/>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Post a Pet</Text>
        <TextInput
          style={styles.input}
          placeholder="Picture URL"
          value={picture}
          onChangeText={setPicture}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Breed"
          value={breed}
          onChangeText={setBreed}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
        />
        <TextInput
          style={styles.input}
          placeholder="Size"
          value={size}
          onChangeText={setSize}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
      <AppFooter/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default PostPetScreen;
