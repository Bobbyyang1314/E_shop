import React from "react";
import {View, StyleSheet, Dimensions, ScrollView, Button} from 'react-native';
import {Text, Box, VStack, HStack, Image, Divider} from "native-base";

import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/cartActions";

const {height, width} = Dimensions.get("window");
const Confirm = (props) => {

    const confirm = props.route.params;

    if (!confirm || !confirm.order) {
        return <Text>Loading...</Text>; // or a loading indicator or any other placeholder
    }

    const confirmOrder = () => {
        setTimeout(() => {
            props.clearCart();
            props.navigation.navigate("Cart");
        }, 500)
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}> Confirm Order </Text>
                {props.route.params ?
                <View style={{ borderWidth: 1, borderColor: 'orange'}}>
                    <Text style={styles.title}>Shipping to:</Text>
                    <View style={{ padding: 8 }}>
                        <Text>Address: {confirm.order.order.shippingAddress1}</Text>
                        <Text>Address2: {confirm.order.order.shippingAddress2}</Text>
                        <Text>City: {confirm.order.order.city}</Text>
                        <Text>Zip Code: {confirm.order.order.zip}</Text>
                        <Text>Country: {confirm.order.order.country}</Text>
                    </View>

                    <Text style={styles.title}>Items:</Text>
                    {confirm.order.order.orderItems.map((x) => {
                        return (
                            <View style={styles.listItem} key={x.product.name}>
                            <HStack space={2} alignItems="center">
                                <Image source={{ uri: x.product.image }} alt="Thumbnail" size={10} />
                                <VStack space={2} flex={1}>
                                <HStack justifyContent="space-between">
                                    <Text>{x.product.name}</Text>
                                    <Text>$ {x.product.price}</Text>
                                </HStack>
                                <Divider my={1} bg="gray.300" />
                                </VStack>
                            </HStack>
                            </View>
                        );
                    })}
                </View>
                : null }
                <View style={{ alignItems: "center", margin: 20 }}>
                    <Button title={"Place order"} onPress={confirmOrder} />
                </View>
            </View>
        </ScrollView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart()),
    };
};


const styles = StyleSheet.create({
    leftContainer: {
        marginRight: "auto",
      },
    rightContainer: {
        marginLeft: "auto",
    },
    container: {
        padding: 8,
        backgroundColor: "white",
    },
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    title: {
        alignSelf: "center",
        margin: 8,
        fontSize: 16,
        fontWeight: "bold",
    },
    listItem: {
        backgroundColor: "white",
        marginBottom: 8,
        padding: 8,
        width: width / 1.2,
    },
});
export default connect(null, mapDispatchToProps)(Confirm);