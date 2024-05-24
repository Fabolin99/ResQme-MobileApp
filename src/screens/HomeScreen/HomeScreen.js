import React, { useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Icon } from 'react-native-elements';
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import WelcomeLogo from "../../../assets/images/logo.png";

const PetCard = ({ name, image, onPress }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={image ? { uri: image } : WelcomeLogo} style={styles.image} />
            <Text style={styles.name}>{name}</Text>
            <Icon
                name={isFavorite ? 'heart' : 'heart-o'}
                type='font-awesome'
                color={isFavorite ? 'red' : 'gray'}
                onPress={toggleFavorite}
                containerStyle={styles.icon}
            />
        </TouchableOpacity>
    );
};

const HomeScreen = ({ navigation }) => {
    const pets = [
        {
            name: 'Pet 1',
            image: 'https://via.placeholder.com/150',
            description: 'Pet 1 is a friendly and playful dog.',
            age: 2,
            breed: 'Labrador',
            size: 'Large',
            gender: 'Male',
            location: 'New York, NY'
        },
        {
            name: 'Pet 2',
            image: null, // No image for this pet
            description: 'Pet 2 is a loving and gentle cat.',
            age: 3,
            breed: 'Persian',
            size: 'Medium',
            gender: 'Female',
            location: 'Los Angeles, CA'
        },
        {
            name: 'Pet 3',
            image: 'https://via.placeholder.com/150',
            description: 'Pet 3 is an energetic and happy puppy.',
            age: 1,
            breed: 'Beagle',
            size: 'Small',
            gender: 'Male',
            location: 'Chicago, IL'
        },
    ];

    return (
        <View style={{ flex: 1 }}>
            <AppHeader />
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 5 }}>
                    Ready to find your next friend?
                </Text>
                <TextInput placeholder="Search for pets" style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 20 }}/>
                <View style={styles.container}>
                    {pets.map((pet, index) => (
                        <PetCard
                            key={index}
                            name={pet.name}
                            image={pet.image}
                            onPress={() => navigation.navigate('PetDetail', {
                                name: pet.name,
                                image: pet.image,
                                description: pet.description,
                                age: pet.age,
                                breed: pet.breed,
                                size: pet.size,
                                gender: pet.gender,
                                location: pet.location,
                            })}
                        />
                    ))}
                </View>
            </ScrollView>
            <AppFooter />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    card: {
        width: '45%',
        margin: 5,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    name: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon: {
        marginTop: 10,
    },
});

export default HomeScreen;
