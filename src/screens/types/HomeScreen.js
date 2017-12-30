import React from 'react';
import {View, Text, Alert, Button} from 'react-native';


export default class HomeScreen extends React.Component  {
    constructor(props) {
        super(props);

        this.state = {
            latitude: "",
            longitude: "",
            error: "",
        };
    }

    // componentDidMount() {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             this.setState({
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude,
    //                 error: "",
    //             });
    //         },
    //         () => {},
    //         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    //     );
    // }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 33}}>Home Screen</Text>
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
                <Button
                    onPress={() => {
                        const to = 'hidden';
                        this.props.navigator.toggleTabs({
                            to,
                            animated: true,
                        });
                    }}
                    title="Submit"
                />
            </View>



        );
    }
}