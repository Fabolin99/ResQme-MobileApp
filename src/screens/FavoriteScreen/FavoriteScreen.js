import React from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from 'react-native-elements';
import WelcomeLogo from "../../../assets/images/logo.png";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";

const FavoriteScreen = ({ favoritePets, navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <AppHeader />
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                {favoritePets.length > 0 ? (
                    <>
                        <Text style={styles.headerMessage}>Your favorite pets:</Text>
                        {favoritePets.map((pet, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.card}
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
                            >
                                <Image source={pet.image ? { uri: pet.image } : WelcomeLogo} style={styles.image} />
                                <Text style={styles.name}>{pet.name}</Text>
                                <Icon
                                    name='heart'
                                    type='font-awesome'
                                    color='red'
                                    containerStyle={styles.icon}
                                />
                            </TouchableOpacity>
                        ))}
                    </>
                ) : (
                    <Text style={styles.message}>You have no favorite pets yet. Start adding some!</Text>
                )}
            </ScrollView>
            <AppFooter />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '90%',
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
    headerMessage: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
    },
});

export default FavoriteScreen;
