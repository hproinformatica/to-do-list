import React from 'react';
import { FlatList } from 'react-native';
import { Divider } from 'react-native-paper';

import ToDoListElement from './ToDoListElement';

export default class ToDoList extends React.Component {

    componentDidMount = () => {
        console.log(this.props.toDoList.toString());
    }

    render() {
        return (
            <FlatList
                ItemSeparatorComponent={() => <Divider />}
                data={this.props.toDoList}
                renderItem={
                    ({ item, index, separators }) => {
                        return (
                            <ToDoListElement
                                onToggleTask={this.props.onToggleTask}
                                onRemoveTask={this.props.onRemoveTask}
                                elementInfo={item}
                                elementIndex={index}
                            />
                        );
                    }
                }
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}
