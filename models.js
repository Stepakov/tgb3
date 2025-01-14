import sequelize from './db.js'
import { DataTypes } from "sequelize";

const User = sequelize.define( 'user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
    chatId: { type: DataTypes.STRING, unique: true },
    rightAnswer: { type: DataTypes.INTEGER, defaultValue: 0 },
    wrongAnswer: { type: DataTypes.INTEGER, defaultValue: 0 },
})

export {
    User,
}