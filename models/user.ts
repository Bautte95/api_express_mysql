import { DataTypes } from "sequelize";
import db from "../bd/connection";

const User = db.define('User',{
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.BOOLEAN
    }
});

export default User