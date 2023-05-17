import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { insertNewQuestion, selectQuestions, truncateQuestions } from '../Tools/Utils';
class Backoffice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            correctAnswer: '',
            wrongAnswer1: '',
            wrongAnswer2: '',
            wrongAnswer3: '',
        };
    }



    handleQuestionChange = (question) => {
        this.setState({ question });
    };

    handleCorrectAnswerChange = (correctAnswer) => {
        this.setState({ correctAnswer });
    };

    handleWrongAnswer1Change = (wrongAnswer1) => {
        this.setState({ wrongAnswer1 });
    };

    handleWrongAnswer2Change = (wrongAnswer2) => {
        this.setState({ wrongAnswer2 });
    };

    handleWrongAnswer3Change = (wrongAnswer3) => {
        this.setState({ wrongAnswer3 });
    };

    handleSubmit = () => {
        const { question, correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3 } = this.state;

        insertNewQuestion(question, correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3);


        this.setState({
            question: '',
            correctAnswer: '',
            wrongAnswer1: '',
            wrongAnswer2: '',
            wrongAnswer3: '',
        });
        selectQuestions();

    };


    render() {
        return (

            <View style={styles.container}>

                <TouchableOpacity style={styles.button_debug} onPress={truncateQuestions}>
                    <Text style={styles.buttonText_debug}>/!\ DEBUG: TRUNCATE</Text>
                </TouchableOpacity>

                <Text style={styles.header}>Créer une question pour le quiz</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Question"
                    value={this.state.question}
                    onChangeText={this.handleQuestionChange}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Réponse correcte"
                    value={this.state.correctAnswer}
                    onChangeText={this.handleCorrectAnswerChange}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mauvaise réponse 1"
                    value={this.state.wrongAnswer1}
                    onChangeText={this.handleWrongAnswer1Change}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mauvaise réponse 2"
                    value={this.state.wrongAnswer2}
                    onChangeText={this.handleWrongAnswer2Change}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mauvaise réponse 3"
                    value={this.state.wrongAnswer3}
                    onChangeText={this.handleWrongAnswer3Change}
                />
                <TouchableOpacity style={styles.button_co} onPress={this.handleSubmit}>
                    <Text style={styles.buttonText_co}>Ajouter cette question</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Backoffice;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        height: 48,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 16,
    },
    button_co: {
        width: '50%',
        height: 48,
        backgroundColor: 'blue',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_debug: {
        width: '50%',
        height: 48,
        backgroundColor: 'red',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText_co: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonText_debug: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
