import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import supabase from '../../components/supabaseClient';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { Picker } from '@react-native-picker/picker';

const EditPetScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { pet } = route.params;
    const [picture, setPicture] = useState(pet.picture);
    const [name, setName] = useState(pet.name);
    const [breed, setBreed] = useState(pet.breed);
    const [age, setAge] = useState(pet.age.toString());
    const [size, setSize] = useState(pet.size);
    const [gender, setGender] = useState(pet.gender);
    const [location, setLocation] = useState(pet.location);
    const [description, setDescription] = useState(pet.description);
    const [type, setType] = useState(pet.type);
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
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

    const handleDelete = async () => {
        try {
            const { error } = await supabase
                .from('pets')
                .delete()
                .eq('id', pet.id);

            if (error) {
                console.log('Error deleting pet: ', error.message);
                Alert.alert('Error deleting pet', error.message);
            } else {
                Alert.alert('Success', 'Pet deleted successfully!');
                console.log('Pet deleted successfully');
                navigation.goBack();
            }
        } catch (error) {
            console.log('Network request failed: ', error.message);
            Alert.alert('Network request failed', error.message);
        }
    };

    const handleSubmit = async () => {
        if (isNaN(age)) {
            Alert.alert('Invalid age', 'Please enter a valid number for age.');
            return;
        }

        setLoading(true);

        try {
            let pictureUrl = picture;

            if (picture !== pet.picture) {
                pictureUrl = await uploadImage(picture);

                if (!pictureUrl) {
                    setLoading(false);
                    return;
                }
            }

            const updatedPetData = {
                picture: pictureUrl,
                name: name,
                breed: breed,
                age: parseInt(age),
                size: size,
                gender: gender,
                location: location,
                description: description,
                type: type,
            };

            const { data: updateData, error: updateError } = await supabase
                .from('pets')
                .update(updatedPetData)
                .eq('id', pet.id);

            if (updateError) {
                console.log('Error updating pet: ', updateError.message);
                Alert.alert('Error updating pet', updateError.message);
            } else {
                Alert.alert('Success', 'Pet updated successfully!');
                console.log('Pet updated successfully:', updateData);
                navigation.goBack();
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
                <Text style={styles.title}>Edit Pet</Text>
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
                        <>
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </>
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
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
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

export default EditPetScreen;