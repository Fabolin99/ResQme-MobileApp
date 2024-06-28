import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import supabase from '../../components/supabaseClient';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer'

const PostPetScreen = () => {
  const [picture, setPicture] = useState(null);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const [gender, setGender] = useState('male');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPicture(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const fileName = `public/images/${Date.now()}.jpg`;
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists === 'file') {
        throw new Error('File does not exist');
      }
      const fileData = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const base64Data = `data:image/jpeg;base64,${fileData}`;

      const { data, error } = await supabase.storage
        .from('pets')
        .upload(fileName, base64Data, {
          contentType: 'image/jpeg',
        });

      if (error) {
        console.log('Error uploading image: ', error.message);
        Alert.alert('Error uploading image', error.message);
        return null;
      }

      const pictureUrl = data.path;
      console.log('Image uploaded successfully:', pictureUrl);
      return pictureUrl;
    } catch (error) {
      console.log('Error storing image: ', error.message);
      Alert.alert('Error storing image', error.message);
      return null;
    }
  };


  const handleSubmit = async () => {
    if (isNaN(age)) {
      Alert.alert('Invalid age', 'Please enter a valid number for age.');
      return;
    }

    if (!picture) {
      Alert.alert('No picture selected', 'Please select a picture before submitting.');
      return;
    }

    setLoading(true);

    try {
      const pictureUrl = await uploadImage(picture);

      if (!pictureUrl) {
        setLoading(false);
        return;
      }

      const petData = {
        picture: pictureUrl,
        name: name,
        breed: breed,
        age: parseInt(age),
        size: size,
        gender: gender,
        location: location,
        description: description,
      };

      const { data: insertData, error: insertError } = await supabase
        .from('pets')
        .insert([petData]);

      if (insertError) {
        console.log('Error submitting form: ', insertError.message);
        Alert.alert('Error submitting form', insertError.message);
      } else {
        Alert.alert('Success', 'Pet posted successfully!');
        console.log('Form submitted successfully:', insertData);
        setPicture(null);
        setName('');
        setBreed('');
        setAge('');
        setSize('');
        setGender('male');
        setLocation('');
        setDescription('');
      }
    } catch (error) {
      console.log('Network request failed: ', error.message);
      Alert.alert('Network request failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Post a Pet</Text>
        <Button title="Pick an image from gallery" onPress={pickImage} />
        {picture && <Image source={{ uri: picture }} style={{ width: 200, height: 200, marginVertical: 20 }} />}
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
          keyboardType="numeric"
        />
        <Picker
          selectedValue={size}
          style={styles.input}
          onValueChange={(itemValue) => setSize(itemValue)}
        >
          <Picker.Item label="Small" value="small" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Large" value="large" />
        </Picker>
        <Picker
          selectedValue={gender}
          style={styles.input}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
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
      </ScrollView>
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Submit" onPress={handleSubmit} />
        )}
      </View>
      <AppFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
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
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
});

export default PostPetScreen;
