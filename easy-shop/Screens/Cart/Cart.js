import React from "react";
import {Dimensions, StyleSheet, Image, Button, TouchableOpacity, ScrollView} from 'react-native';
import {Box, Container, Text, View} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import CartItem from "./CartItem";


import { connect } from "react-redux";
import * as actions from '../../Redux/Actions/cartActions'

import Icon from 'react-native-vector-icons/FontAwesome'
import EasyButton from "../../Shared/StyledComponents/EasyButton";

const { height, width} = Dimensions.get("window");
const Cart = (props) => {

    let total = 0;
    props.cartItems.forEach(cart => {
        return (total += cart.product.price)
    });

    // Use toFixed(1) to display only one decimal point
    total = total.toFixed(1);

    return (
        <Box flex={1}>
            {props.cartItems.length ? (
                <Box flex={1}>
                    <SwipeListView
                        data={props.cartItems}
                        renderItem={(data) => (
                            <CartItem item={data} />
                        )}
                        renderHiddenItem={(data) => (
                            <View style={styles.hiddenContainer}>
                                <TouchableOpacity
                                    style={styles.hiddenButton}
                                    onPress={() => props.removeFromCart(data.item)}
                                >
                                    <Icon name="trash" color={"white"} size={30} />
                                </TouchableOpacity>
                            </View>
                        )}
                        disableRightSwipe={true}
                        previewOpenDelay={3000}
                        friction={1000}
                        tension={40}
                        leftOpenValue={75}
                        stopLeftSwipe={75}
                        rightOpenValue={-75}
                    />
                </Box>
            ) : (
                <Container style={styles.emptyContainer}>
                    <Text>Looks your cart is empty</Text>
                    <Text>Add products to your cart</Text>
                </Container>
            )}
            {/*total add checkout*/}
            <View style={styles.bottomContainer}>
                <View style={styles.leftContainer}>
                    <Text style={styles.price}>$ {total}</Text>
                </View>
                <View style={styles.rightContainer}>
                    <EasyButton
                        danger
                        medium
                        onPress={() => props.clearCart()}
                    >
                        <Text style={{color: "white", fontWeight: "bold"}}>Clear</Text>
                    </EasyButton>
                </View>
                <View style={styles.rightContainer}>
                    <EasyButton
                        primary
                        medium
                        onPress={() => props.navigation.navigate('Checkout')}
                    >
                        <Text style={{color: "white", fontWeight: "bold"}}>Checkout</Text>
                    </EasyButton>
                </View>
            </View>
        </Box>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state
    return {
        cartItems: cartItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart()),
        removeFromCart: (item) => dispatch(actions.removeFromCart(item))
    }
}

const styles = StyleSheet.create({
    leftContainer: {
        marginRight: 'auto',
    },
    rightContainer:{
        marginLeft: 'auto',
        // Consider delete hardcode margin
        marginRight: 0,
        marginLeft: 40,
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center", // Center the content vertically
        flex: 1, // Use flex: 1 to occupy available space
        marginLeft: 40,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        elevation: 20,
        width: width,
        marginTop: 'auto', // Add marginTop with 'auto' to push the container to the bottom
    },
    price: {
        fontSize: 18,
        // margin: 20,
        color: 'red'
    },
    hiddenContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    hiddenButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 25,
        height: 70,
        width: width / 1.2
    },
    ListItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: "flex-start"
    },
    body: {
        // body 样式
        margin: 10,
        alignItems: "center",
        flexDirection: "row"
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Cart);