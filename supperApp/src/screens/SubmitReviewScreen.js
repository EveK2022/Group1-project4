import axios from 'axios';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet, ScrollView, Text, View, Alert, InputAccessoryView } from "react-native";
import COLORS from '../consts/colors';
import ReviewInput from './SignInSignUp/components/ReviewInput';
import Button from './SignInSignUp/components/Button';
import Loader from './SignInSignUp/components/Loader';
import Icon from "react-native-vector-icons/MaterialIcons";
import API from './Api';

const SubmitReviewScreen = ({navigation, route}) => {

    const place = route.params;
    const requestData = route.params;

    const [submitReview, setSubmitReview] = React.useState({
        review: "",
    });

    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState({});

    const validate = () => {
        let valid = true;
        if(!submitReview.review) {
            handleError("Please input a review", "review");
            valid = false;
        } else if (valid) {
            submission();
        }
    }

    const handleOnChange = (text, input) => {
        setSubmitReview((prevState) => ({...prevState, [input]: text}));
    };

    const handleError = (errorMessage, input) => {
        setErrors((prevState) => ({...prevState, [input]: errorMessage}));
    };

    const submission = async () => {
        setLoading(true);

        try {
            const requestReviewData = {
                location_id: place.id,
                user_id: requestData.id,
                review: submitReview.review,
            }
            await API.post("/user/newreview", requestReviewData);
            navigation.navigate("DetailsScreen");
        } catch(error) {
            Alert.alert("Error", "Something went wrong")
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Icon 
                name="arrow-back-ios" 
                size={28}
                color={COLORS.primary2}
                onPress={navigation.goBack} 
                style={{paddingLeft: 10}}
            />
            <Loader visible={loading}/>
            <ScrollView contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
                <Text style={styles.textHeader}>Submit Your Review</Text>
                <View style={{marginVertical: 20}}>
                    <ReviewInput placeholder="Enter a review" iconName="comment-text" label="Review" error={errors.review} onFocus={() => {handleError(null, "review");}} onChangeText={(text) => handleOnChange(text, 'review')}/>
                    <Button title="Submit Review" onPress={validate} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    textHeader: {
        color: COLORS.black,
        fontSize: 40,
        fontWeight: 'bold',
    },
})

export default SubmitReviewScreen;