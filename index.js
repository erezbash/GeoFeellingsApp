import {registerScreens} from './src/screens'
import { Navigation } from 'react-native-navigation';

registerScreens();

Navigation.startTabBasedApp({
    tabs: [
        {
            label: 'One',
            icon: require('./img/one.png'),
            screen: 'example.Home', // this is a registered name for a screen
            title: 'Screen One'
        },
        {
            label: 'Two',
            icon: require('./img/one.png'),
            screen: 'example.Details',
            title: 'Screen Two'
        }
    ]
});

// AppRegistry.registerComponent('Test2', () => RootNavigator);
