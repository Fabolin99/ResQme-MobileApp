import React from "react";
import { View, ScrollView, Text } from "react-native";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";

const FavoriteScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <AppHeader />
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                {/* Your screen content goes here */}
                <Text>This is the favorite screen!</Text>
            </ScrollView>
            <AppFooter />
        </View>
    );
};

export default FavoriteScreen;