import React, { useState, useCallback } from "react";
import {View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions, Image} from "react-native";
import {Input, VStack} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Ionicons} from "@expo/vector-icons";

import ListItem from "./ListItem";



const { height, width } = Dimensions.get("window");


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

    return (
        <View>
            <View>
                <VStack space={2} alignItems="center" mt={4}>
                    <Input
                        placeholder="Search"
                        // onChangeText={(text) => searchProduct(text)}
                        variant="filled"
                        width="100%"
                        borderRadius="10"
                        py="1"
                        px="2"
                        InputLeftElement={
                            <Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />
                        }
                        // rightElement={<Text
                        //     onPress={onBlur}
                        //     marginRight={3}
                        //     outlineColor={"black"}
                        //     color={"gray.400"}>Back</Text>}
                    />
                </VStack>
            </View>
            {loading ? (
                <View>
                    <ActivityIndicator size="large" color="red"/>
                </View>
            ) : (
                <FlatList
                    data={productFilter}
                    renderItem={({ item, index }) => (
                        // <ListItem
                        //     {...item}
                        //     navigation={props.navigation}
                        //     index={index}
                        // />
                        <View>
                            <Image source={{
                                uri: item.image
                                    ? item.image
                                    : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'}}
                                   resizeMode="contain"
                            />
                            <Text>{item.brand}</Text>
                            <Text numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                            <Text numberOfLines={1} ellipsizeMode="tail">{item.category.name}</Text>
                            <Text>${item.price}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    )
}

export default Products;