import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { selectBestUsers } from '../Tools/Utils';

class ScoreScreen extends React.Component {
    state = {
        topPlayers: [],
    };

    componentDidMount() {
        this.fetchTopPlayers();
    }

    fetchTopPlayers = async () => {
        try {
            const topPlayers = await selectBestUsers();
            this.setState({ topPlayers });
        } catch (error) {
            console.log('Failed to fetch top players:', error);
        }
    };

    render() {
        const { topPlayers } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.header}>Score Screen</Text>
                <Text style={styles.subHeader}>Top Players:</Text>
                <View style={styles.topPlayersContainer}>
                    {topPlayers.map((player, index) => (
                        <View key={index} style={styles.playerContainer}>
                            <Text style={styles.playerRank}>{index + 1}</Text>
                            <View style={styles.playerInfo}>
                                <Text style={styles.playerName}>{player.name}</Text>
                                <Text style={styles.playerScore}>Score: {player.score}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333333',
        textTransform: 'uppercase',
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#666666',
        textTransform: 'uppercase',
    },
    topPlayersContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    playerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 12,
        elevation: 2,
    },
    playerRank: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
        backgroundColor: '#4CAF50',
        color: '#ffffff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        textAlign: 'center',
    },
    playerInfo: {
        flex: 1,
        marginLeft: 8,
    },
    playerName: {
        fontSize: 16,
        marginBottom: 4,
        color: '#333333',
    },
    playerScore: {
        fontSize: 14,
        color: '#888888',
    },
});

export default ScoreScreen;
