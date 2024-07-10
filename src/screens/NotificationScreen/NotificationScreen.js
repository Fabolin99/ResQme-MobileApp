import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import supabase from '../../components/supabaseClient';

const NotificationScreen = () => {
    const [notifications, setNotifications] = useState([
        // Sample notifications
        { id: 1, title: 'New Pet Available', message: 'A new pet has been added to your favorite shelter.' },
        { id: 2, title: 'Adoption Approved', message: 'Your adoption request has been approved.' },
    ]);

    useEffect(() => {
        const petSubscription = supabase
            .channel('public: pets')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pets' }, payload => {
                setNotifications(prevNotifications => [
                    ...prevNotifications,
                    {
                        id: payload.new.id,
                        title: 'New Pet Added',
                        message: `A new pet named ${payload.new.name} has been added.`
                    }
                ]);
            })
            .subscribe();

        // Cleanup subscription on unmount
        return () => {
            supabase.removeChannel(petSubscription);
        };
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <AppHeader />
            <ScrollView contentContainerStyle={{ paddingBottom: 50, paddingHorizontal: 20 }}>
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <View key={notification.id} style={styles.notificationCard}>
                            <Text style={styles.title}>{notification.title}</Text>
                            <Text style={styles.message}>{notification.message}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noNotificationsMessage}>You have no notifications at this time.</Text>
                )}
            </ScrollView>
            <AppFooter />
        </View>
    );
};

const styles = StyleSheet.create({
    notificationCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    message: {
        fontSize: 14,
        color: 'gray',
    },
    noNotificationsMessage: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
    },
});

export default NotificationScreen;