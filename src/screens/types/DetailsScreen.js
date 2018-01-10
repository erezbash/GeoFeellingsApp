import React from 'react';
import {Alert, FlatList} from 'react-native';
import {Button, Colors, Text, TextArea, TextInput, View} from "react-native-ui-lib";
import Question from "../../components/Question";

export default class DetailsScreen extends React.Component {
    render() {
        return (
            <View flex padding-5>
                <FlatList
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={() => <View padding-10/>}
                    data={[
                        {questionType: "OPEN", data: {numOfOptions: 7, questionString: "What do you think about Dor? sdf sjdhfsdkjfh sdjfh dsj"}},
                        {questionType: "RADIO", data: {numOfOptions: 7, questionString: "Happiness"}},
                        {questionType: "RADIO", data: {numOfOptions: 7, questionString: "Sadness"}},
                        {questionType: "RADIO", data: {numOfOptions: 7, questionString: "Sadness"}},
                        {questionType: "RADIO", data: {numOfOptions: 7, questionString: "Surprise"}},
                        {questionType: "RADIO", data: {numOfOptions: 7, questionString: "Surprise"}},
                        {questionType: "RADIO", data: {numOfOptions: 7, questionString: "Fear"}},
                        {questionType: "RADIO", data: {numOfOptions: 7, questionString: "Fear"}},
                        {questionType: "RADIO", data: {numOfOptions: 7, questionString: "Fear"}},
                        {questionType: "RADIO", data: {numOfOptions: 7, questionString: "Fear"}},
                        {questionType: "RADIO", data: {numOfOptions: 7, questionString: "Fear"}},
                        {questionType: "RADIO", data: {numOfOptions: 7, questionString: "Fear"}},
                        {questionType: "RADIO", data: {numOfOptions: 7, questionString: "Fear"}},
                        {questionType: "RADIO", data: {numOfOptions: 7, questionString: "Disgust"}},
                        {questionType: "RADIO", data: {numOfOptions: 7, questionString: "Anger"}},
                    ]}
                    renderItem={({item}) =>
                        <Question question={item}/>
                    }
                />
                <Button
                    onPress={() => Alert.alert(
                        'Thanks!',
                        'Have a great day!',
                        [
                            {
                                text: 'Back Home', onPress: () => {
                                    const {navigate} = this.props.navigation;
                                    navigate('Home');
                                }
                            }
                        ],
                        {cancelable: false}
                    )}
                    text70
                    white
                    background-orange30
                    label="Submit"
                />
            </View>
        );
    }
}