import React from 'react';
import {
    Alert,
    AsyncStorage,
    Image,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback
} from 'react-native';
import { Button, TextInput, withTheme } from 'react-native-paper';

class AuthScreen extends React.Component {

    static navigationOptions = {
        gesturesEnabled: false,
        header: null,
    };

    state = {
        userName: '',
        userPassword: '',
    }

    constructor(props) {
        super(props);

        this.colors = this.props.theme.colors;
    }

    _onAuthButtonPress = async () => {
        try {

            if (!this.state.userName || !this.state.userPassword) {
                Alert.alert('Atenção', 'É obrigatório informar o nome e senha de usuário para autenticação.');
                return;
            }

            const userJSON = await AsyncStorage.getItem('user');

            if (!userJSON) {
                const user = { name: this.state.userName, password: this.state.userPassword };

                await AsyncStorage.setItem('user', JSON.stringify(user));

                Alert.alert(
                    'Sucesso',
                    'Usuário cadastrado com sucesso!',
                    [{ text: 'OK', onPress: () => this.props.navigation.navigate('ToDoListScreen') }]
                );

                return;

            } else {
                const user = JSON.parse(userJSON);

                if ((this.state.userName.toLocaleUpperCase() != user.name.toLocaleUpperCase()) || 
                    (this.state.userPassword.toLocaleUpperCase() != user.password.toLocaleUpperCase())) {
                    Alert.alert('Atenção', 'Nome e/ou senha de usuários inválidos!');
                    return;
                }

                this.props.navigation.navigate('ToDoListScreen');
            }
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    }

    _onRemoveUserButtonPress = async () => {
        try {
            const userJSON = await AsyncStorage.getItem('user');

            if (!userJSON) {
                Alert.alert('Atenção', 'Não existe informações de usuário registrado no aplicativo.');
                return;
            }

            await AsyncStorage.removeItem('user');

            Alert.alert('Sucesso', 'O usuário foi removido com sucesso!');
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View
                        style={styles.container}
                    >
                        <View style={styles.logoContainer}>
                            <Text style={{ ...styles.logo, color: this.colors.primary }}>TO-DO LIST!</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                mode="flat"
                                style={styles.inputStyle}
                                label="Usuário"
                                value={this.state.userName}
                                onChangeText={userName => this.setState({ userName })}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { this.userPasswordTextInput.focus() }}
                                blurOnSubmit={false}
                            />
                            <TextInput
                                mode="flat"
                                style={styles.inputStyle}
                                label="Senha"
                                value={this.state.userPassword}
                                onChangeText={userPassword => this.setState({ userPassword })}
                                ref={input => { this.userPasswordTextInput = input; }}
                            />
                            <Button
                                mode="contained"
                                icon="person"
                                onPress={this._onAuthButtonPress}
                                style={styles.authButtonStyle}
                            >
                                Autenticar usuário
                            </Button>
                        </View>
                        <View style={styles.configContainer}>
                            <Button
                                mode="text"
                                icon="clear"
                                onPress={this._onRemoveUserButtonPress}
                            >
                                Remover usuário
                            </Button>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView >
        );
    }
}

export default withTheme(AuthScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    logoContainer: {
        flexGrow: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 55,
    },
    inputContainer: {
        flexGrow: 1,
    },
    inputStyle: {
        margin: 5,
    },
    authButtonStyle: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
    },
});