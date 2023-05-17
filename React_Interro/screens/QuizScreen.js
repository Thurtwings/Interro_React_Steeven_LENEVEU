import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Easing } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RadioButton } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { selectQuestions, updateScore } from '../Tools/Utils';

class QuizScreen extends React.Component {
    state = {
        username: this.props.route.params.username,
        questions: [],
        currentQuestionIndex: 0,
        selectedAnswer: null,
        answerStatus: null,
        score: 0,
    };

    componentDidMount() {
        this.fetchQuestions();
    }

    fetchQuestions = async () => {
        try {
            let questions = await selectQuestions();
            questions = questions.map((question) => ({
                ...question,
                choices: this.shuffleArray(question.choices),
            }));
            this.shuffleArray(questions);
            this.setState({ questions: this.getRandomQuestions(questions, 10) });
        } catch (error) {
            console.log('Failed to fetch questions:', error);
        }
    };

    getRandomQuestions = (questions, count) => {
        const shuffledQuestions = this.shuffleArray(questions);
        return shuffledQuestions.slice(0, count);
    };

    shuffleArray = (array) => {
        const shuffledArray = [...array];
        let currentIndex = shuffledArray.length;
        let temporaryValue;
        let randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = shuffledArray[currentIndex];
            shuffledArray[currentIndex] = shuffledArray[randomIndex];
            shuffledArray[randomIndex] = temporaryValue;
        }

        return shuffledArray;
    };

    handleAnswerSelect = (selectedAnswer) => {
        this.setState({ selectedAnswer });
    };

    handleNextQuestion = () => {
        const {
            currentQuestionIndex,
            questions,
            selectedAnswer,
            score,
        } = this.state;
        const currentQuestion = questions[currentQuestionIndex];

        // Check if the selected answer is correct
        const isAnswerCorrect = selectedAnswer === currentQuestion.correctAnswer;

        // Update the score based on the correctness of the answer
        const updatedScore = isAnswerCorrect ? score + 1 : score;

        this.setState(
            (prevState) => ({
                answerStatus: isAnswerCorrect ? 'correct' : 'wrong',
                score: updatedScore,
            }),
            () => {
                setTimeout(() => {
                    if (currentQuestionIndex + 1 < questions.length) {
                        this.setState((prevState) => ({
                            currentQuestionIndex: prevState.currentQuestionIndex + 1,
                            selectedAnswer: null,
                            answerStatus: null,
                        }));
                    } else {
                        updateScore(this.state.username, this.state.score )
                        this.props.navigation.navigate('Score', { score: updatedScore });
                    }
                }, 1000);
            }
        );
    };

    render() {
        const {
            questions,
            currentQuestionIndex,
            selectedAnswer,
            answerStatus,
            score,
        } = this.state;

        if (questions.length === 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.loadingText}>Loading questions...</Text>
                    <StatusBar style="auto" />
                </View>
            );
        }

        const currentQuestion = questions[currentQuestionIndex];

        return (
            <View style={styles.container}>
                <Text style={styles.header}>Quiz!</Text>
                <Text style={styles.question}>{currentQuestion.question}</Text>
                <Text style={styles.scoreText}>Score: {score}</Text>
                <Text style={styles.progressText}>
                    Question {currentQuestionIndex + 1}/{questions.length}
                </Text>
                <Animatable.View
                    animation={answerStatus === 'correct' ? 'fadeIn' : null}
                    duration={500}
                    style={styles.choicesContainer}
                >
                    {currentQuestion.choices.map((choice, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.choiceContainer,
                                selectedAnswer === choice &&
                                answerStatus === null &&
                                styles.choiceSelected,
                                answerStatus === 'correct' &&
                                choice === currentQuestion.correctAnswer &&
                                styles.choiceCorrect,
                                answerStatus === 'wrong' &&
                                choice === selectedAnswer &&
                                styles.choiceWrong,
                            ]}
                            onPress={() => this.handleAnswerSelect(choice)}
                            disabled={answerStatus !== null}
                        >
                            <RadioButton
                                value={choice}
                                color={styles.radioButtonColor.color}
                                uncheckedColor={styles.radioButtonColor.color}
                                disabled={answerStatus !== null}
                            />
                            <Text style={styles.choiceText}>{choice}</Text>
                        </TouchableOpacity>
                    ))}
                </Animatable.View>
                <TouchableOpacity
                    style={[
                        styles.button,
                        answerStatus === null && styles.buttonDisabled,
                    ]}
                    onPress={this.handleNextQuestion}
                    disabled={answerStatus !== null}
                >
                    <Text style={styles.buttonText}>Next Question</Text>
                </TouchableOpacity>
                <StatusBar style="auto" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    loadingText: {
        fontSize: 18,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    question: {
        fontSize: 18,
        marginBottom: 16,
        textAlign: 'center',
    },
    scoreText: {
        fontSize: 16,
        marginBottom: 8,
    },
    progressText: {
        fontSize: 16,
        marginBottom: 16,
    },
    choicesContainer: {
        width: '100%',
    },
    choiceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ccc',
        padding: 10,
    },
    choiceSelected: {
        borderColor: '#2196F3',
    },
    choiceCorrect: {
        backgroundColor: '#4CAF50',
    },
    choiceWrong: {
        backgroundColor: '#FF5722',
    },
    radioButtonColor: {
        color: '#2196F3',
    },
    choiceText: {
        marginLeft: 8,
    },
    button: {
        width: '50%',
        height: 48,
        backgroundColor: '#2196F3',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default QuizScreen;
