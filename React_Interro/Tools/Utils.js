import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("database.db");
export const createUsersDatabase = function()
{
    db.transaction(tx => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, name TEXT, score INTEGER);");
        tx.executeSql("CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY NOT NULL, question TEXT, answer TEXT, g1 TEXT, g2 TEXT, g3 TEXT);");

    });
}

export const insertNewUser = function (name, score)
{
    db.transaction((tx =>{
        tx.executeSql("INSERT INTO users(name, score) values (?, ?);", [name, score]);
    }))
}
export const insertNewQuestion = function (question, answer, g1, g2, g3)
{
    db.transaction((tx =>{
        tx.executeSql("INSERT INTO questions(question, answer, g1, g2, g3 ) values (?, ?, ?, ?, ?);", [question, answer, g1, g2, g3]);

    }))
}

export const selectUserWithLogInformations = function (name)
{
    db.transaction(tx => {tx.executeSql("SELECT  * FROM users WHERE name = ?", [name], (_, {rows}) =>
        console.log(rows)
        
    )});
}
export const updateScore = function (name, score) {
    db.transaction(tx => {
        tx.executeSql("UPDATE users SET score = ? WHERE name = ?", [score, name], (_, { rowsAffected }) => {
            console.log(`Score updated for ${name}. Rows affected: ${rowsAffected}`);
        });
    });
}


export const selectBestUsers = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM users ORDER BY score DESC LIMIT 5",
                [],
                (_, { rows }) => {
                    resolve(rows._array);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};


export const selectQuestionElement = function (element, id)
{
    db.transaction(tx => {tx.executeSql("SELECT ? FROM questions WHERE id = ?",  [element, id],(_, {rows}) =>
        console.log(rows)
    )});
}


export const truncateQuestions = function () {
    db.transaction((tx) => {
        tx.executeSql("DELETE FROM questions;", [], (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
                console.log("Questions truncated successfully.");
            } else {
                console.log("Failed to truncate questions.");
            }
        });
    });
};
export const truncateUsers = function () {
    db.transaction((tx) => {
        tx.executeSql("DELETE FROM users;", [], (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
                console.log("users truncated successfully.");
            } else {
                console.log("Failed to truncate users.");
            }
        });
    });
};

export const selectQuestions = function () {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM questions',
                [],
                (_, { rows }) => {
                    const questions = rows._array.map((row) => ({
                        id: row.id,
                        question: row.question,
                        choices: [row.answer, row.g1, row.g2, row.g3].sort(() => Math.random() - 0.5),
                        correctAnswer: row.answer,
                    }));
                    resolve(questions);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};



