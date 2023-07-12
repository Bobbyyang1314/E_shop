import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,LogBox } from 'react-native';
import React from 'react';
import { NativeBaseProvider } from "native-base";

// Navigators
import Main from './Navigators/Main'

// Screens
import ProductContainer from './Screens/Products/ProductContainer';
import Header from "./Shared/Header";

import { NavigationContainer } from "@react-navigation/native";

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

LogBox.ignoreAllLogs(true);

export default function App() {
    return (
        <NativeBaseProvider>
            <Provider store={store}>
                <NavigationContainer>
                    <Header/>
                    {/*<ProductContainer/>*/}
                    <Main/>
                </NavigationContainer>
            </Provider>
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
