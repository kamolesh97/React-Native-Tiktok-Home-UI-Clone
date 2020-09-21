import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {LogBox, Dimensions, Platform} from 'react-native';
import IndexFile from './src';
import EStyleSheet from 'react-native-extended-stylesheet';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / (Platform.OS == 'ios' ? 380 : 450)});

export default class App extends React.Component {
    render() {
        // LogBox.ignoreAllLogs(true);
        return (
            <PaperProvider>
                <NavigationContainer>
                    <IndexFile />
                </NavigationContainer>
            </PaperProvider>
        );
    }
}
