import React from 'react';
import { createAppContainer } from 'react-navigation';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import AppNavigator from './navigation/AppNavigator';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
		primary: '#00a099',
		secondary: '#575756',
		background: '#ffffff',
    }
}

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return (
            <PaperProvider theme={theme}>
                <AppContainer />
            </PaperProvider>
        );
    }
}