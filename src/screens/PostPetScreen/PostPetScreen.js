import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import supabase from '../../components/supabaseClient';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';

const PostPetScreen = () => {
  const [picture, setPicture] = useState(null);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const [gender, setGender] = useState('male');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('dog');
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
      if (!fileInfo.exists) {
        throw new Error('File does not exist');
      }
      const fileData = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const arrayBuffer = decode(fileData);

      const { data, error } = await supabase.storage
        .from('pets')
        .upload(fileName, arrayBuffer, {
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

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.log('Error fetching session: ', sessionError.message);
        Alert.alert('Error fetching session', sessionError.message);
        setLoading(false);
        return;
      }

      const user = sessionData.session?.user;

      const petData = {
        picture: pictureUrl,
        name: name,
        breed: breed,
        age: parseInt(age),
        size: size,
        gender: gender,
        location: location,
        description: description,
        type: type,
        user_id: user?.id,
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
        setType('dog');
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
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick an image from gallery</Text>
        </TouchableOpacity>
        {picture && <Image source={{ uri: picture }} style={styles.image} />}
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
          style={styles.picker}
          onValueChange={(itemValue) => setSize(itemValue)}
        >
          <Picker.Item label="Select Size" value="" />
          <Picker.Item label="Small" value="small" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Large" value="large" />
        </Picker>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
        <Picker
          selectedValue={type}
          style={styles.picker}
          onValueChange={(itemValue) => setType(itemValue)}
        >
          <Picker.Item label="Select Type" value="" />
          <Picker.Item label="Dog" value="dog" />
          <Picker.Item label="Cat" value="cat" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={[styles.input, styles.description]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
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
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
  },
  description: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
    alignSelf: 'center',
  },
});

export default PostPetScreen;