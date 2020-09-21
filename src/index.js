// import {createStackNavigator, TransitionPresets, CardStyleInterpolators} from 'react-navigation-stack';
import React from 'react';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';

import Home from './Screens/Home';

const Stack = createStackNavigator();
function AppFlow() {
    return (
        <Stack.Navigator
            headerMode="none"
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}
export default AppFlow;
