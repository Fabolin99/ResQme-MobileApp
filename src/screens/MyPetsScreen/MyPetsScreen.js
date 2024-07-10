import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import supabase from '../../components/supabaseClient';

const MyPetsScreen = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            const fetchPets = async () => {
                setLoading(true);
                try {
                    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
                    if (sessionError) {
                        console.log('Error fetching session: ', sessionError.message);
                        return;
                    }

                    const user = sessionData.session?.user;

                    const { data: petsData, error: petsError } = await supabase
                        .from('pets')
                        .select('*')
                        .eq('user_id', user?.id);

                    if (petsError) {
                        console.log('Error fetching pets: ', petsError.message);
                    } else {
                        setPets(petsData);
                    }
                } catch (error) {
                    console.log('Error fetching pets: ', error.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchPets();

            // Return a cleanup function if needed.
            return () => {};
        }, [])
    );

    const handleEditPet = (pet) => {
        navigation.navigate('EditPet', { pet });
    };

    return (
        <View style={styles.container}>
            <AppHeader />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.headerText}>These are the pets you have posted:</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : pets.length > 0 ? (
                    pets.map((pet, index) => (
                        <TouchableOpacity key={index} style={styles.petContainer} onPress={() => handleEditPet(pet)}>
                            <Image source={{ uri: pet.picture }} style={styles.petImage} />
                            <Text style={styles.petName}>{pet.name}</Text>
                            <Text style={styles.petDetails}>Breed: {pet.breed}</Text>
                            <Text style={styles.petDetails}>Age: {pet.age}</Text>
                            <Text style={styles.petDetails}>Size: {pet.size}</Text>
                            <Text style={styles.petDetails}>Gender: {pet.gender}</Text>
                            <Text style={styles.petDetails}>Location: {pet.location}</Text>
                            <Text style={styles.petDetails}>Description: {pet.description}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.text}>You haven't posted any pets yet.</Text>
                )}
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 24,
        marginTop: 20,
    },
    petContainer: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    petImage: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    petName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    petDetails: {
        fontSize: 16,
    },
});

export default MyPetsScreen;
