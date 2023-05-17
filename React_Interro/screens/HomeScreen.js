import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createUsersDatabase, insertNewUser, selectUserWithLogInformations, truncateUsers, insertNewQuestion, truncateQuestions, selectQuestions } from "../Tools/Utils";

class HomeScreen extends React.Component {
    state = {
        username: "",
        score: 0,
    };

    componentDidMount() {
        createUsersDatabase();
    }

    handleThisUser = () => {
        const { username } = this.state;

        if (username.trim() === "") {
            Alert.alert("Error", "Please enter a valid username");
            return;
        }

        if (selectUserWithLogInformations(username)) {
            this.props.navigation.navigate('Quiz');
        } else {
            insertNewUser(username, 0);
            console.log(selectUserWithLogInformations(username));

            this.props.navigation.navigate('Quiz', { username: this.state.username });
        }
    };

    generateQuestions = () => {
        const questions = [
            {
                question: "Quel est le nom du capitaine de l'équipage du chapeau de paille ?",
                answer: "Monkey D. Luffy",
                choices: ["Roronoa Zoro", "Sanji", "Trafalgar Law"],
            },
            {
                question: "Quelle est la prime actuelle de Monkey D. Luffy dans l'anime?",
                answer: "1,5 milliards de Berry",
                choices: ["100 millions de Berry", "500 millions de Berry", "800 millions de Berry"],
            },
            {
                question: "Quel est le fruit du démon de Monkey D. Luffy ?",
                answer: "Gomu Gomu no Mi",
                choices: ["Mera Mera no Mi", "Ope Ope no Mi", "Yami Yami no Mi"],
            },
            {
                question: "Qui est l'archéologue de l'équipage du chapeau de paille ?",
                answer: "Nico Robin",
                choices: ["Nami", "Usopp", "Franky"],
            },
            {
                question: "Quel est le surnom de Roronoa Zoro ?",
                answer: "Le chasseur de pirates",
                choices: ["Le bretteur invincible", "Le roi des pirates", "Le tireur d'élite"],
            },
            {
                question: "Quel est le nom du bateau de l'équipage du chapeau de paille lors de l'arc post-Waterseven?",
                answer: "Le Thousand Sunny",
                choices: ["Le Sabre de Xebec", "Le Going Merry", "Le Red Force"],
            },
            {
                question: "Quel est le fruit du démon de Trafalgar D. Water Law ?",
                answer: "Ope Ope no Mi",
                choices: ["Gomu Gomu no Mi", "Yami Yami no Mi", "Hie Hie no Mi"],
            },
            {
                question: "Quel est le rêve de Nami ?",
                answer: "Cartographier le monde",
                choices: ["Devenir la meilleure épéiste", "Retrouver All Blue", "Trouver One Piece"],
            },
            {
                question: "Qui est le cuisinier de l'équipage du chapeau de paille ?",
                answer: "Sanji",
                choices: ["Chopper", "Brook", "Jinbe"],
            },
            {
                question: "Quel est le nom du charpentier de l'équipage du chapeau de paille ?",
                answer: "Franky",
                choices: ["Nico Robin", "Usopp", "Chopper"],
            },
            {
                question: "Quel est le prénom du père de Monkey D. Luffy ?",
                answer: "Dragon",
                choices: ["Garp", "Roger", "Shanks"],
            },
            {
                question: "Quel est le fruit du démon de Buggy le Clown ?",
                answer: "Bara Bara no Mi",
                choices: ["Gomu Gomu no Mi", "Hito Hito no Mi", "Suke Suke no Mi"],
            },
            {
                question: "Quel est le nom de la mère d'Ace ?",
                answer: "Portgas D. Rouge",
                choices: ["Nico Robin", "Nami", "Boa Hancock"],
            },
            {
                question: "Quel est le nom de la ville d'origine de Monkey D. Luffy ?",
                answer: "Fushia",
                choices: ["Water Seven", "Loguetown", "Sabaody"],
            },
            {
                question: "Qui est le musicien de l'équipage du chapeau de paille ?",
                answer: "Brook",
                choices: ["Chopper", "Jinbe", "Sanji"],
            },
            {
                question: "Quel est le fruit du démon de Nico Robin ?",
                answer: "Hana Hana no Mi",
                choices: ["Yami Yami no Mi", "Gura Gura no Mi", "Beri Beri no Mi"],
            },
            {
                question: "Quel est le rêve de Roronoa Zoro ?",
                answer: "Devenir le meilleur épéiste du monde",
                choices: ["Devenir le roi des pirates", "Retrouver All Blue", "Devenir le meilleur tireur d'élite"],
            },
            {
                question: "Quel est le nom du sniper de l'équipage du chapeau de paille ?",
                answer: "Usopp",
                choices: ["Franky", "Sanji", "Chopper"],
            },
            {
                question: "Quel est le nom de l'équipage de Barbe Blanche ?",
                answer: "Les pirates de Barbe Blanche",
                choices: ["Les révolutionnaires", "L'équipage des pirates rouges", "Les pirates de Big Mom"],
            },
            {
                question: "Quel est le fruit du démon de Marshall D. Teach ?",
                answer: "Yami Yami no Mi",
                choices: ["Gomu Gomu no Mi", "Mera Mera no Mi", "Hie Hie no Mi"],
            },
            {
                question: "Qui est le navigateur de l'équipage du chapeau de paille ?",
                answer: "Nami",
                choices: ["Robin", "Brook", "Sanji"],
            },
            {
                question: "Quel est le rêve de Tony Tony Chopper ?",
                answer: "De trouver le remède universel",
                choices: ["Devenir le roi des pirates", "Retrouver All Blue", "Devenir le meilleur épéiste"],
            },
            {
                question: "Quel est le nom du médecin de l'équipage du chapeau de paille ?",
                answer: "Chopper",
                choices: ["Franky", "Usopp", "Brook"],
            },
            {
                question: "Quel est le fruit du démon de Smoker ?",
                answer: "Moku Moku no Mi",
                choices: ["Hito Hito no Mi", "Yomi Yomi no Mi", "Bari Bari no Mi"],
            },
            {
                question: "Quel est le nom de la princesse de l'île de Dressrosa ?",
                answer: "Rebecca",
                choices: ["Vivi", "Hancock", "Shirahoshi"],
            },
            {
                question: "Quel est le fruit du démon de Sabo ?",
                answer: "Mera Mera no Mi",
                choices: ["Gura Gura no Mi", "Hie Hie no Mi", "Bara Bara no Mi"],
            },
            {
                question: "Quel est le rêve de Franky ?",
                answer: "Que le Thousand Sunny fasse le tour du monde",
                choices: ["Devenir le roi des pirates", "Retrouver All Blue", "Devenir le meilleur charpentier"],
            },
            {
                question: "Quel est le nom du père adoptif de Portgas D. Ace ?",
                answer: "Edward Newgate",
                choices: ["Gol D. Roger", "Shanks", "Monkey D. Dragon"],
            },
            {
                question: "Quel est le fruit du démon de Portgas D. Ace ?",
                answer: "Mera Mera no Mi",
                choices: ["Gomu Gomu no Mi", "Hie Hie no Mi", "Yami Yami no Mi"],
            },
            {
                question: "Quel est le nom de la ville natale de Trafalgar D. Water Law ?",
                answer: "Flevance",
                choices: ["Water Seven", "Loguetown", "Sabaody"],
            },
            {
                question: "Quel est le fruit du démon de Eustass Kid ?",
                answer: "Jiki Jiki no Mi",
                choices: ["Gura Gura no Mi", "Bara Bara no Mi", "Hito Hito no Mi"],
            },
            {
                question: "Quel est le nom du père de Portgas D. Ace ?",
                answer: "Gol D. Roger",
                choices: ["Barbe Blanche", "Shanks", "Monkey D. Dragon"],
            },
            {
                question: "Quel est le fruit du démon de Boa Hancock ?",
                answer: "Mero Mero no Mi",
                choices: ["Hie Hie no Mi", "Gomu Gomu no Mi", "Yami Yami no Mi"],
            },
            {
                question: "Quel est le nom du royaume de Nefertari Vivi ?",
                answer: "Alabasta",
                choices: ["Skypiea", "Wa", "Dressrosa"],
            },
            {
                question: "Quel est le fruit du démon de Borsalino (Amiral Kizaru) ?",
                answer: "Pika Pika no Mi",
                choices: ["Hito Hito no Mi", "Gura Gura no Mi", "Yomi Yomi no Mi"],
            },
            {
                question: "Quel est le nom du roi des pirates ?",
                answer: "Gol D. Roger",
                choices: ["Barbe Blanche", "Shanks", "Monkey D. Dragon"],
            },
            {
                question: "Quel est le fruit du démon de Bartholomew Kuma ?",
                answer: "Nikyu Nikyu no Mi",
                choices: ["Gura Gura no Mi", "Bara Bara no Mi", "Hie Hie no Mi"],
            },
            {
                question: "Quel est le nom de l'équipage du roi des pirates ?",
                answer: "Les pirates de Roger",
                choices: ["Les pirates de Barbe Blanche", "Les pirates de Shanks", "Les révolutionnaires"],
            },
            {
                question: "Quel est le fruit du démon de Doflamingo ?",
                answer: "Ito Ito no Mi",
                choices: ["Yomi Yomi no Mi", "Gura Gura no Mi", "Hito Hito no Mi"],
            },
            {
                question: "Quel est le nom du pays de Chopper ?",
                answer: "Drum",
                choices: ["Zou", "Fishman Island", "Skypiea"],
            },
            {
                question: "Quel est le fruit du démon du nuage de gaz Smiley sur Punk Hazard ?",
                answer: "Sara Sara no Mi",
                choices: ["Gura Gura no Mi", "Hana Hana no Mi", "Bara Bara no Mi"],
            },
            {
                question: "Quel est le nom du sabreur légendaire du pays de Wa ?",
                answer: "Oden",
                choices: ["Kinemon", "Kanjuro", "Raizo"],
            },
            {
                question: "Quel est le fruit du démon de Rob Lucci ?",
                answer: "Neko Neko no Mi, modèle léopard",
                choices: ["Zou Zou no Mi", "Inu Inu no Mi, modèle loup", "Sara Sara no Mi, modèle renne"],
            },
            {
                question: "Quel est le nom de la médecin de l'équipage de Gol D. Roger ?",
                answer: "Crocus",
                choices: ["Hiluluk", "Kureha", "Chopper"],
            },
            {
                question: "Quel est le fruit du démon de Sengoku ?",
                answer: "Hito Hito no Mi, modèle bouddha",
                choices: ["Gura Gura no Mi", "Bara Bara no Mi", "Yami Yami no Mi"],
            },
            {
                question: "Quel est le nom du navire de Barbe Blanche ?",
                answer: "Le Moby Dick",
                choices: ["Le Red Force", "Le Thousand Sunny", "Le Going Merry"],
            },
            {
                question: "Quel est le fruit du démon de Gecko Moria ?",
                answer: "Kage Kage no Mi",
                choices: ["Gura Gura no Mi", "Bara Bara no Mi", "Hito Hito no Mi"],
            },
            {
                question: "Quel est le nom du pays de Nico Robin ?",
                answer: "Ohara",
                choices: ["Skypiea", "Water Seven", "Elbaf"],
            },
            {
                question: "Quel est le fruit du démon de Perona ?",
                answer: "Horo Horo no Mi",
                choices: ["Gura Gura no Mi", "Bara Bara no Mi", "Hie Hie no Mi"],
            },
            {
                question: "De quel endroit du monde Sanji est-il originaire ?",
                answer: "North Blue",
                choices: ["West Blue", "East Blue", "South Blue"],
            },
            {
                question: "Quel est le fruit du démon de Big Mom ?",
                answer: "Soru Soru no Mi",
                choices: ["Gura Gura no Mi", "Bara Bara no Mi", "Yami Yami no Mi"],
            },
            {
                question: "Quel est le nom du pays des hommes-poissons ?",
                answer: "Fishman Island",
                choices: ["Skypiea", "Elbaf", "Dressrosa"],
            },
            {
                question: "Quel est le fruit du démon de Magellan ?",
                answer: "Doku Doku no Mi",
                choices: ["Gura Gura no Mi", "Bara Bara no Mi", "Hito Hito no Mi"],
            },
            {
                question: "Quel est le nom de l'équipage de Capone Bege ?",
                answer: "Les pirates du Fire Tank",
                choices: ["Les pirates de Barbe Noire", "Les pirates de Shanks", "Les pirates de Big Mom"],
            },
            {
                question: "Quel est le nom de l'équipage de Kaido ?",
                answer: "Les pirates aux Cent Bêtes",
                choices: ["Les pirates du Heart", "Les pirates de Big Mom", "Les pirates de Barbe Blanche"],
            },
            {
                question: "Quel est le fruit du démon de Caesar Clown ?",
                answer: "Gasu Gasu no Mi",
                choices: ["Gura Gura no Mi", "Bara Bara no Mi", "Hito Hito no Mi"],
            },
            {
                question: "Quel est le nom du pays des géants ?",
                answer: "Elbaf",
                choices: ["Skypiea", "Dressrosa", "Fishman Island"],
            },
            {
                question: "Quel est le fruit du démon de Ener ?",
                answer: "Goro Goro no Mi",
                choices: ["Hito Hito no Mi", "Gura Gura no Mi", "Yami Yami no Mi"],
            },
            {
                question: "Quel est le nom de l'équipage de Doflamingo ?",
                answer: "La Famille Don Quichotte",
                choices: ["Les pirates de Barbe Blanche", "Les pirates de Roger", "Les pirates de Big Mom"],
            },
            {
                question: "Quel est le fruit du démon de Fujitora ?",
                answer: "Zushi Zushi no Mi",
                choices: ["Hito Hito no Mi", "Gura Gura no Mi", "Bara Bara no Mi"],
            },
            {
                question: "Quel est le fruit du démon de Pudding ?",
                answer: "Memo Memo no Mi",
                choices: ["Gura Gura no Mi", "Horo Horo no Mi", "Yami Yami no Mi"],
            },
            {
                question: "Quel est le nom de la ville d'origine de Franky ?",
                answer: "Water Seven",
                choices: ["Loguetown", "Sabaody", "Enies Lobby"],
            },
            {
                question: "Quel est le fruit du démon de Kinemon ?",
                answer: "Fuku Fuku no Mi",
                choices: ["Hito Hito no Mi", "Gura Gura no Mi", "Bara Bara no Mi"],
            },
            {
                question: "Quel est le nom de l'équipage de Shanks ?",
                answer: "Les pirates du Roux",
                choices: ["Les pirates de Roger", "Les pirates de Barbe Blanche", "Les pirates de Big Mom"],
            },
            {
                question: "Quel est le fruit du démon de Bellamy ?",
                answer: "Bane Bane no Mi",
                choices: ["Gura Gura no Mi", "Bara Bara no Mi", "Hito Hito no Mi"],
            },
            {
                question: "Quel est le nom de l'île où se trouve l'équipage de Barbe Noire ?",
                answer: "Ruche",
                choices: ["Banaro", "Jaya", "Baltigo"],
            },
            {
                question: "Quel est le fruit du démon de Vander Decken IX ?",
                answer: "Mato Mato no Mi",
                choices: ["Gura Gura no Mi", "Bara Bara no Mi", "Hito Hito no Mi"],
            },
            {
                question: "Quel est le fruit du démon de Law lorsqu'il était enfant ?",
                answer: "Ope Ope no Mi",
                choices: ["Gura Gura no Mi", "Bara Bara no Mi", "Hito Hito no Mi"],
            },
            {
                question: "Quel est le nom de l'île des Tontattas ?",
                answer: "Green Bit",
                choices: ["Punk Hazard", "Dressrosa", "Zou"],
            },
            {
                question: "Quel est le fruit du démon de Katakuri ?",
                answer: "Mochi Mochi no Mi",
                choices: ["Gura Gura no Mi", "Bara Bara no Mi", "Hito Hito no Mi"],
            },
            {
                question: "Quel est le nom de l'île où se trouve la base des révolutionnaires ?",
                answer: "Baltigo",
                choices: ["Marie-Joie", "Impel Down", "Enies Lobby"],
            },
            {
                question: "Quel est le fruit du démon de Cracker ?",
                answer: "Bisu Bisu no Mi",
                choices: ["Gura Gura no Mi", "Bara Bara no Mi", "Hito Hito no Mi"],
            },
        ];

        questions.forEach((q) => {
            insertNewQuestion(q.question, q.answer, q.choices[0], q.choices[1], q.choices[2]);
            console.log("Question ajoutée!");
        });


    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Entrez votre Pseudonyme</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={"Pseudonyme"}
                    onChangeText={(text) => this.setState({ username: text })}
                />

                <TouchableOpacity
                    style={styles.startButton}
                    onPress={this.handleThisUser}
                >
                    <Text style={styles.buttonText}>Commencer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.debugButton}
                    onPress={() => this.props.navigation.navigate('Back')}
                    // onPress={() => this.generateQuestions()}
                    // onPress={() => truncateQuestions()}
                    // onPress={() => truncateUsers()}
                >
                    <Text style={styles.debugButtonText}>Ajouter Nouvelle question</Text>
                </TouchableOpacity>

                <StatusBar style="auto" />
            </View>
        );
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 32,
        color: '#333',
        textAlign: 'center',
    },
    textInput: {
        backgroundColor: '#fff',
        width: '75%',
        height: 48,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 32,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    startButton: {
        width: '75%',
        height: 48,
        backgroundColor: '#2196F3',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    debugButton: {
        width: '75%',
        height: 48,
        backgroundColor: '#FF5252',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    debugButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});
