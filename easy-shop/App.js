import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,LogBox } from 'react-native';
import React from 'react';
import { NativeBaseProvider } from "native-base";

// Screens
import ProductContainer from './Screens/Products/ProductContainer';
import Header from "./Shared/Header";
import Banner from "./Shared/Banner";

LogBox.ignoreAllLogs(true);

export default function App() {
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Header/>
                <ProductContainer/>
            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
