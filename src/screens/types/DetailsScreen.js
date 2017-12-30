import React from 'react';
import {Button, View, Alert, FlatList} from 'react-native';
import RadioButtonGroup from "../../components/RadioButtonGroup";

export default class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={[
                        {numberOfRadios: 5, name:"Happiness"},
                        {numberOfRadios: 2, name:"Sadness"},
                        {numberOfRadios: 4, name:"Sadness"},
                        {numberOfRadios: 6, name:"Surprise"},
                        {numberOfRadios: 2, name:"Surprise"},
                        {numberOfRadios: 3, name:"Fear"},
                        {numberOfRadios: 5, name:"Fear"},
                        {numberOfRadios: 5, name:"Fear"},
                        {numberOfRadios: 5, name:"Fear"},
                        {numberOfRadios: 5, name:"Fear"},
                        {numberOfRadios: 1, name:"Fear"},
                        {numberOfRadios: 5, name:"Fear"},
                        {numberOfRadios: 3, name:"Disgust"},
                        {numberOfRadios: 5, name:"Anger"},
                    ]}
                       renderItem={({item}) =>
                        <RadioButtonGroup
                            name={item.name}
                            numberOfRadios={item.numberOfRadios}/>}
                />
                <Button
                    onPress={() => Alert.alert(
                        'Thanks!',
                        'Have a great day!',
                        [
                            {
                                text: 'Back Home', onPress: () => {
                                const {navigate} = this.props.navigation;
                                navigate('Home');}
                            }
                        ],
                        {cancelable: false}
                    )}
                    title="Submit"
                />
            </View>
        );
    }
}