import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";

const PetDetailScreen = ({ route }) => {
    const { name, image, description, age, breed, size, gender, location } = route.params;

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
                <TouchableOpacity style={styles.adoptButton} onPress={() => alert('Adoption request sent!')}>
                    <Text style={styles.adoptButtonText}>Adopt Me</Text>
                </TouchableOpacity>
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
});

export default PetDetailScreen;
