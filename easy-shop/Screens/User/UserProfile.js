import React, { useEffect, useContext, useState } from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import {Box, Container} from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";

const UserProfile = (props) => {

    const context = useContext(AuthGlobal);
    const [userProfile, setUserProfile] = useState();

    // 一秒后执行的代码
    // function delayedCode() {
    //     console.log("一秒后执行的代码");
    // }

// 延迟一秒后执行
    useEffect( () => {
        console.log("Denngu")
        if (
            context.stateUser.isAuthenticated === false ||
            context.stateUser.isAuthenticated === null
        ) {
            console.log("Denngwwu")
            props.navigation.navigate("Login");
        }
        // console.log(JSON.parse(AsyncStorage.getItem("jwt")))


        const userStr = AsyncStorage.getItem('jwt');
        // console.log(userStr)
        // console.log(JSON.parse(userStr))
        // const user = JSON.parse(userStr).token;
        // console.log("user");

        let jwt = ""
        async function fetchData() {
            try {
                try {
                    jwt = await AsyncStorage.getItem("jwt");
                    console.log(jwt);
                } catch (error) {
                    console.log(error);
                }
                console.log(context.stateUser.user.userId);
                console.log(baseURL + "users/" + context.stateUser.user.userId);
                const user = await axios.get(baseURL + "users/" + context.stateUser.user.userId, {
                    headers: { Authorization: `Bearer ${jwt}` },
                });
                setUserProfile(user.data);
                console.log("Finish");
            } catch (error) {
                console.log(error);
            }
        }

        fetchData().then(r => console.log("Nothing"));
        console.log("user");


        return () => {
            setUserProfile();
        }

    }, [context.stateUser.isAuthenticated])

    return (
        <Box style={styles.container}>
            <ScrollView contentContainerStyle={styles.subContainer}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    Profile
                </Text>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ margin: 10 }}>
                        Email: {userProfile ? userProfile.email : ""}
                    </Text>
                    <Text style={{ margin: 10 }}>
                        Phone: {userProfile ? userProfile.phone : ""}
                    </Text>
                </View>
                <View style={{ marginTop: 80 }}>
                    <Button title={"Sign Out"} onPress={() => [
                        AsyncStorage.removeItem("jwt"),
                        logoutUser(context.dispatch)
                    ]}/>
                </View>
            </ScrollView>
        </Box>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    subContainer: {
        alignItems: "center",
        marginTop: 60
    },
    order: {
        marginTop: 20,
        alignItems: "center",
        marginBottom: 60
    }
})

export default UserProfile;