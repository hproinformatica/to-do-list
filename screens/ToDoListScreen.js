import React from 'react';
import { Alert, AsyncStorage, KeyboardAvoidingView, Platform, StyleSheet, ToastAndroid, View } from 'react-native';
import { Appbar, TextInput, IconButton } from 'react-native-paper';

import ToDoList from '../components/ToDoList';

export default class ToDoListScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <Appbar.Header>
                    <Appbar.Content title="To-Do List" />
                </Appbar.Header>
            ),
            gesturesEnabled: false,
        }
    }

    state = {
        inputText: '',
        toDoList: [],
    }

    componentDidMount = async () => {
        try {
            const toDoList = JSON.parse(await AsyncStorage.getItem('toDoList'));
            if (toDoList) {
                this.setState({ toDoList });
            }
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    }

    _saveToDoList = async (toDoList) => {
        try {
            await AsyncStorage.setItem('toDoList', JSON.stringify(toDoList));
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    }

    onCreateTask = async taskDescription => {
        const task = { checked: false, description: taskDescription };

        const toDoList = [...this.state.toDoList, task];

        await this._saveToDoList(toDoList);

        if (Platform.OS === 'android') {
            ToastAndroid.showWithGravity(
                'Atividade criada com sucesso!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }

        this.setState({ toDoList, inputText: '', snackbarVisible: true });
    }

    onToggleTask = async (taskID) => {
        // Pegando a referência de toDoList para ser mais simples de manipular 
        // a tarefa (identificada por taskID) que desejamos
        const toDoList = this.state.toDoList;
        toDoList[taskID].checked = !toDoList[taskID].checked;

        await this._saveToDoList(toDoList);

        this.setState({ toDoList });
    }

    onRemoveTask = async (taskID) => {
        // Pegando a referência de toDoList para ser mais simples de manipular 
        // a tarefa (identificada por taskID) que desejamos
        const toDoList = this.state.toDoList;
        toDoList.splice(taskID, 1);

        await this._saveToDoList(toDoList);

        if (Platform.OS === 'android') {
            ToastAndroid.showWithGravity(
                'Atividade removida com sucesso!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }

        this.setState({ toDoList, snackbarVisible: true });
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                keyboardVerticalOffset='80'
            >
                <ToDoList
                    toDoList={this.state.toDoList}
                    onToggleTask={this.onToggleTask}
                    onRemoveTask={this.onRemoveTask}
                />
                <TextInput
                    mode="flat"
                    label="O que você tem para fazer?"
                    value={this.state.inputText}
                    onChangeText={inputText => this.setState({ inputText })}
                    onSubmitEditing={event => this.onCreateTask(event.nativeEvent.text)}
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    listContainer: {
        flex: 1,
    },
});
