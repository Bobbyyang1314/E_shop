import React, { useContext } from "react";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"

const Tab = createBottomTabNavigator();


// Stacks
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import AdminNavigator from "./AdminNavigator";
import UserNavigator from "./UserNavigator";

import AuthGlobal from "../Context/store/AuthGlobal";

import CartIcon from "../Shared/CartIcon";

const Main = () => {
    
    const context = useContext(AuthGlobal);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{ 
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: "#e91e63",
                tabBarShowLabel: false,
                tabBarStyle: [
                    {
                    display: "flex"
                    },
                    null
                ]
            }}
        >

            <Tab.Screen
                name='Home'
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="home"
                            style={{ position:"relative" }}
                            color={color}
                            size={30}
                        />
                    ),
                    tabBarLabel: null,
                }}
            />

            <Tab.Screen
                name="Cart"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Icon
                                name="shopping-cart"
                                // style={{ position:"relative" }}
                                color={color}
                                size={30}
                            />
                            <CartIcon/>
                        </View>
                    )
                }}
            />
            

            { context.stateUser.user.isAdmin === true ? (
                <Tab.Screen
                    name="Admin"
                    component={AdminNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon
                                name="cog"
                                // style={{ position:"relative" }}
                                color={color}
                                size={30}
                            />
                        )
                    }}
                />
            ) : null}

            <Tab.Screen
                name="User"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="user"
                            // style={{ position:"relative" }}
                            color={color}
                            size={30}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Main;
