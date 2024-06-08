import React, { useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import WelcomeLogo from "../../../assets/images/logo.png";

const PetCard = ({ name, image, onPress, onToggleFavorite }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        onToggleFavorite({ name, image });
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

const PetScreen = ({ navigation, favoritePets, onToggleFavorite }) => {
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

    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [filter, setFilter] = useState("All");
    const [sort, setSort] = useState(null);

    const toggleFilterModal = () => {
        setIsFilterModalVisible(!isFilterModalVisible);
    };

    const applyFilter = (selectedFilter, selectedSort) => {
        setFilter(selectedFilter);
        setSort(selectedSort);
        toggleFilterModal();
    };

    const getSortedPets = () => {
        let sortedPets = [...pets];
        if (sort === "Age") {
            sortedPets.sort((a, b) => a.age - b.age);
        } else if (sort === "Name") {
            sortedPets.sort((a, b) => a.name.localeCompare(b.name));
        }
        return sortedPets;
    };

    return (
            <View style={{ flex: 1 }}>
                <AppHeader />
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 5 }}>
                        Ready to find your next friend?
                    </Text>
                    <TextInput placeholder="Search for pets" style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 20 }}/>
                    <TouchableOpacity onPress={toggleFilterModal} style={styles.filterIcon}>
                        <Icon name='filter' type='font-awesome' color='#000' />
                    </TouchableOpacity>
                    <View style={styles.container}>
                        {getSortedPets()
                            .filter(pet => filter === "All" || (filter === "Dogs" && pet.breed.toLowerCase() === "labrador") || (filter === "Cats" && pet.breed.toLowerCase() === "persian"))
                            .map((pet, index) => (
                                <TouchableOpacity key={index}  style={styles.card} onPress={() => navigation.navigate('PetDetail', {
                                    name: pet.name,
                                    image: pet.image,
                                    description: pet.description,
                                    age: pet.age,
                                    breed: pet.breed,
                                    size: pet.size,
                                    gender: pet.gender,
                                    location: pet.location,
                                })}>
                                    <Image source={pet.image ? { uri: pet.image } : WelcomeLogo} style={styles.image} />
                                    <Text style={styles.name}>{pet.name}</Text>
                                    <Icon
                                        name={favoritePets.some(favoritePet => favoritePet.name === pet.name) ? 'heart' : 'heart-o'}
                                        type='font-awesome'
                                        color={favoritePets.some(favoritePet => favoritePet.name === pet.name) ? 'red' : 'gray'}
                                        onPress={() => onToggleFavorite(pet)}
                                        containerStyle={styles.icon}
                                    />
                                </TouchableOpacity>
                            ))}
                    </View>
                </ScrollView>
                <AppFooter />

                <Modal isVisible={isFilterModalVisible} onBackdropPress={toggleFilterModal}>
                    <View style={styles.modal}>
                        <TouchableOpacity onPress={() => applyFilter("All", null)} style={styles.modalOption}>
                            <Text>All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => applyFilter("Dogs", null)} style={styles.modalOption}>
                            <Text>Dogs</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => applyFilter("Cats", null)} style={styles.modalOption}>
                            <Text>Cats</Text>
                        </TouchableOpacity>
                        <Text style={{ marginVertical: 10 }}>Sort by:</Text>
                        <TouchableOpacity onPress={() => applyFilter(filter, "Name")} style={styles.modalOption}>
                            <Text>Name</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => applyFilter(filter, "Age")} style={styles.modalOption}>
                            <Text>Age</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
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
    filterIcon: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginBottom: -30,
        zIndex: 1,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 50,
        elevation: 5,
    },
    modal: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalOption: {
        paddingVertical: 10,
    },
});

export default PetScreen;