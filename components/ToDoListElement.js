import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Colors, Checkbox, IconButton, TouchableRipple } from 'react-native-paper';

export default class ToDoListElement extends React.Component {

    render() {
        const checkBox =
            Platform.OS === 'android' ?
                <Checkbox.Android
                    status={this.props.elementInfo.checked ? 'checked' : 'unchecked'}
                    onPress={() => this.props.onToggleTask(this.props.elementIndex)}
                />
                :
                <Checkbox.IOS
                    status={this.props.elementInfo.checked ? 'checked' : 'unchecked'}
                    onPress={() => this.props.onToggleTask(this.props.elementIndex)}
                />;

        return (
            <TouchableRipple onPress={() => this.props.onToggleTask(this.props.elementIndex)}>
                <View style={styles.container}>
                    {checkBox}
                    <Text
                        style={{ ...styles.text, textDecorationLine: this.props.elementInfo.checked ? 'line-through' : 'none' }}
                    >
                        {this.props.elementInfo.description}
                    </Text>
                    <IconButton
                        icon="clear"
                        color={Colors.red500}
                        size={20}
                        onPress={() => this.props.onRemoveTask(this.props.elementIndex)}
                    />
                </View>
            </TouchableRipple>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    text: {
        flex: 2,
        fontSize: 16,
    }
});