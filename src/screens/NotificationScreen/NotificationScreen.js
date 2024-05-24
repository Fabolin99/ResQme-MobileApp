import React from "react";
import { View, ScrollView, Text } from "react-native";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";

const NotificationScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <AppHeader />
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                {/* Your screen content goes here */}
                <Text>This is the notifications screen!</Text>
            </ScrollView>
            <AppFooter />
        </View>
    );
};

export default NotificationScreen;
