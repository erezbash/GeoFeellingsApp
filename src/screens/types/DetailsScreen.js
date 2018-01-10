import React from 'react';
import {Alert, FlatList} from 'react-native';
import {Button, Colors, Text, TextArea, TextInput, View} from "react-native-ui-lib";
import Question from "../../components/Question";
import {awaitFetch} from "../../javascript/htmlFetch";

export default class DetailsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: []}
    }

    componentWillMount() {
        let fetch = awaitFetch('GET', 'admin/question', '');
        fetch.then(json => this.setState({data: json.questions}))
    }

    render() {
        return (
            <View flex padding-5>
                <FlatList
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={() => <View padding-10/>}
                    data={this.state.data}
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