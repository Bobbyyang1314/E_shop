import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";

import { connect } from "react-redux";

const CartIcon = (props) => {
    const getBadgeWidth = () => {
      // Assuming the font size is 13 (change if different)
      const fontSize = 13;
      // Calculate the approximate width based on font size and number of digits
      const digits = props.cartItems.length.toString().length;
      const approximateWidth = fontSize * (digits + 1) - 5;
      // Set a minimum width of 24 (change if needed)
      return Math.max(approximateWidth, 24);
    };
  
    return (
      <>
        {props.cartItems.length ? (
          <Badge style={[styles.badge, { width: getBadgeWidth() }]}>
            <Text style={styles.text}>{props.cartItems.length}</Text>
          </Badge>
        ) : null}
      </>
    );
  };

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems
    }

}

const styles = StyleSheet.create({
    badge: {
        width: 24, // Increased to accommodate the text
        height: 24, // Increased to accommodate the text
        borderRadius: 12, // Make it circular by setting half of the width
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        top: -6, // Adjust the vertical position
        right: -18, // Adjust the horizontal position
        backgroundColor: "red",
    },
    text: {
        fontSize: 13,
        fontWeight: "bold",
        color: "white",
        textAlign: "center", // Center the text horizontally
        padding: 0,
        margin: 0,
        lineHeight: 18, // Set line height equal to font size for vertical centering
        position: "relative", // Added to allow text to overlap badge
    },
});

export default connect(mapStateToProps)(CartIcon);