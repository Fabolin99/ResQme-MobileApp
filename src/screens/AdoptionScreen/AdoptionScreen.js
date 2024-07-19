import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import { useNavigation } from "@react-navigation/native";
import supabase from '../../components/supabaseClient';

const AdoptionScreen = ({ route }) => {
    const { name } = route.params;
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        adopterName: '',
        contact: '',
        message: '',
        address: '',
        occupation: '',
        reason: '',
    });
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) {
                console.log('Error fetching session: ', sessionError.message);
                return;
            }
            const user = sessionData.session?.user;
            setUserId(user?.id);
        };

        fetchUserId();
    }, []);

    const handleAdopt = async () => {
        if (Object.values(formData).some(field => field === '')) {
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
                    address: formData.address,
                    occupation: formData.occupation,
                    reason: formData.reason,
                    status: 'pending',
                    adopter_id: userId
                }
            ]);

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            Alert.alert('Success', 'Adoption request sent!');
            setFormData({ adopterName: '', contact: '', message: '', address: '', occupation: '', reason: '' });
        }
    };

    return (
        <View style={styles.container}>
            <AppHeader />
            <View style={styles.formContainer}>
                <Text style={styles.title}>Adopt {name}</Text>
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
                    placeholder="Address"
                    value={formData.address}
                    onChangeText={(text) => setFormData({ ...formData, address: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Occupation"
                    value={formData.occupation}
                    onChangeText={(text) => setFormData({ ...formData, occupation: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Reason for Adopting"
                    value={formData.reason}
                    onChangeText={(text) => setFormData({ ...formData, reason: text })}
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
                <Text style={styles.infoText}>
                    Want to know more about our adoption process?{' '}
                    <Text style={styles.link} onPress={() => navigation.navigate('AdoptionInfo')}>Adoption Process</Text>
                </Text>
            </View>
            <AppFooter />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
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
        marginTop: 16,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    infoText: {
        color: 'gray',
        marginVertical: 10,
        textAlign: 'center',
    },
    link: {
        color: '#FDB075',
    },
});

export default AdoptionScreen;