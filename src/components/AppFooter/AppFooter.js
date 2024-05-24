import React from "react";
import { View, Text } from "react-native";

const AppFooter = () => {
    return (
        <View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'skyblue', padding: 10 }}>
            <Text style={{ textAlign: 'center', color: '#fff' }}>
            © {new Date().getFullYear()} ResQme. All rights reserved.
            </Text>
        </View>
    );
};

export default AppFooter;
