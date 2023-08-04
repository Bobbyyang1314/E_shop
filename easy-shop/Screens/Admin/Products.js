import React, { useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions, Image } from "react-native";
import { Input, VStack } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Ionicons} from "@expo/vector-icons";

import ListItem from "./ListItem";


const { height, width } = Dimensions.get("window");

const ListHeader = () => {
    return (
        <View
            elevation={1}
            style={styles.listHeader}
        >
            <View style={styles.headerItem}>

            </View>
            <View style={styles.headerItem}>
                <Text style={styles.boldHeader}>Brand</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={styles.boldHeader}>Name</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={styles.boldHeader} numberOfLines={1}>Category</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={styles.boldHeader}>Price</Text>
            </View>
        </View>
    )
}


const Products = (props) => {

    const [productList, setProductList] = useState();
    const [productFilter, setProductFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();

    useFocusEffect(
        useCallback(
            () => {
                // Get Token
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res);
                    })
                    .catch((error) => console.log(error))

                axios
                    .get(`${baseURL}products`)
                    .then((res) => {
                        setProductList(res.data);
                        setProductFilter(res.data);
                        setLoading(false);
                    })
                return () => {
                    setProductList();
                    setProductFilter();
                    setLoading(true);
                }
            }, [],
        )
    )

    const searchProduct = (text) => {
        if (text === "") {
            setProductFilter(productList);
        }
        setProductFilter(
            productList.filter((i) => {
                i.name.toLowerCase().includes(text.toLowerCase())
            })
        )
    }

    return (
        <View>
            <View>
                <VStack space={2} alignItems="center" mt={4}>
                    <Input
                        placeholder="Search"
                        onChangeText={(text) => searchProduct(text)}
                        variant="filled"
                        width="100%"
                        borderRadius="10"
                        py="1"
                        px="2"
                        // InputLeftElement={
                        //     <Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />
                        // }
                        // rightElement={<Text
                        //     onPress={onBlur}
                        //     marginRight={3}
                        //     outlineColor={"black"}
                        //     color={"gray.400"}>Back</Text>}
                    />
                </VStack>
            </View>
            {loading ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="red"/>
                </View>
            ) : (
                <FlatList
                    data={productFilter}
                    ListHeaderComponent={ListHeader}
                    renderItem={({ item, index }) => (
                        <ListItem
                            {...item}
                            navigation={props.navigation}
                            index={index}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: "row",
        padding: 5,
        backgroundColor: "gainsboro"
    },
    headerItem: {
        margin: 3,
        width: width / 6
    },
    boldHeader: {
        fontWeight: "bold"
    },
    spinner: {
        height: height / 2,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default Products;