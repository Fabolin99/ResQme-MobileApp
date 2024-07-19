import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import supabase from '../../components/supabaseClient';

const AdoptionStatusScreen = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            const fetchRequests = async () => {
                setLoading(true);
                try {
                    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
                    if (sessionError) {
                        console.log('Error fetching session: ', sessionError.message);
                        return;
                    }

                    const user = sessionData.session?.user;

                    const { data: requestsData, error: requestsError } = await supabase
                        .from('adoption_requests')
                        .select('*')
                        .eq('adopter_id', user?.id);

                    if (requestsError) {
                        console.log('Error fetching adoption requests: ', requestsError.message);
                    } else {
                        setRequests(requestsData);
                    }
                } catch (error) {
                    console.log('Error fetching adoption requests: ', error.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchRequests();

            // Return a cleanup function if needed.
            return () => {};
        }, [])
    );

    return (
        <View style={styles.container}>
            <AppHeader />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.headerText}>These are your adoption requests:</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : requests.length > 0 ? (
                    requests.map((request, index) => (
                        <View key={index} style={styles.requestContainer}>
                            <Text style={styles.requestDetails}><Text style={{fontWeight: 'bold'}}>Pet Name:</Text> {request.pet_name}</Text>
                            <Text style={styles.requestDetails}><Text style={{fontWeight: 'bold'}}>Adopter Name:</Text> {request.adopter_name}</Text>
                            <Text style={styles.requestDetails}><Text style={{fontWeight: 'bold'}}>Contact:</Text> {request.contact}</Text>
                            <Text style={styles.requestDetails}><Text style={{fontWeight: 'bold'}}>Address:</Text> {request.address}</Text>
                            <Text style={styles.requestDetails}><Text style={{fontWeight: 'bold'}}>Occupation:</Text> {request.occupation}</Text>
                            <Text style={styles.requestDetails}><Text style={{fontWeight: 'bold'}}>Reason:</Text> {request.reason}</Text>
                            <Text style={styles.requestDetails}><Text style={{fontWeight: 'bold'}}>Status:</Text> {request.status}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.text}>You haven't made any adoption requests yet.</Text>
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
    requestContainer: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    requestDetails: {
        fontSize: 16,
    },
});

export default AdoptionStatusScreen;