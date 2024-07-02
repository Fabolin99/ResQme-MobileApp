import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import supabase from '../../components/supabaseClient';

const PetDetailScreen = ({ route }) => {
    const { name, image, description, age, breed, size, gender, location } = route.params;
    const [isFormVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        adopterName: '',
        contact: '',
        message: '',
    });

    const handleAdopt = async () => {
        if (formData.adopterName === '' || formData.contact === '' || formData.message === '') {
            Alert.alert('Error', 'Please fill out all fields');
            return;
        }

        const { data, error } = await supabase
            .from('adoption_requests')
            .insert([
                {
                    pet_name: name,
                    adopter_name: formData.adopterName,
                    contact: formData.contact,
                    message: formData.message,
                    status: 'pending'
                }
            ]);

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            Alert.alert('Success', 'Adoption request sent!');
            setFormVisible(false);
            setFormData({ adopterName: '', contact: '', message: '' });
        }
    };

    return (
        <View style={styles.container}>
            <AppHeader />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={{ uri: image }} style={styles.image} />
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.breed}>{breed}</Text>
                <Text style={styles.age}>{age} years old</Text>
                <Text style={styles.size}>Size: {size}</Text>
                <Text style={styles.gender}>Gender: {gender}</Text>
                <Text style={styles.location}>Location: {location}</Text>
                <Text style={styles.description}>{description}</Text>

                {!isFormVisible ? (
                    <TouchableOpacity style={styles.adoptButton} onPress={() => setFormVisible(true)}>
                        <Text style={styles.adoptButtonText}>Adopt Me</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Your Name"
                            value={formData.adopterName}
                            onChangeText={(text) => setFormData({ ...formData, adopterName: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Contact Information"
                            value={formData.contact}
                            onChangeText={(text) => setFormData({ ...formData, contact: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Message"
                            value={formData.message}
                            onChangeText={(text) => setFormData({ ...formData, message: text })}
                        />
                        <TouchableOpacity style={styles.submitButton} onPress={handleAdopt}>
                            <Text style={styles.submitButtonText}>Submit Request</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
            <AppFooter />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    breed: {
        fontSize: 18,
        color: '#666',
        marginBottom: 8,
    },
    age: {
        fontSize: 18,
        color: '#666',
        marginBottom: 8,
    },
    size: {
        fontSize: 18,
        color: '#666',
        marginBottom: 8,
    },
    gender: {
        fontSize: 18,
        color: '#666',
        marginBottom: 8,
    },
    location: {
        fontSize: 18,
        color: '#666',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    adoptButton: {
        backgroundColor: '#ff6347',
        padding: 12,
        borderRadius: 8,
        marginBottom: 45,
    },
    adoptButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    form: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    submitButton: {
        backgroundColor: '#ff6347',
        padding: 12,
        borderRadius: 8,
        marginBottom: 45,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default PetDetailScreen;
