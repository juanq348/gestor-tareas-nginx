import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db.js'

export type TareaEstado = "pendiente" | "completada"

export interface ITareasInfo {
    id?:number,
    titulo: string,
    descripcion: string,
    estado: TareaEstado
}

export default class Tareas extends Model<ITareasInfo>{
    declare id?: number;
    declare titulo: string;
    declare descripcion: string;
    declare estado: TareaEstado;
}

Tareas.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titulo: { type: DataTypes.STRING, allowNull: false },
        descripcion: { type: DataTypes.STRING, allowNull: false },
        estado: { type:DataTypes.ENUM('pendiente', 'completada'), defaultValue:'pendiente'}
    },
    {
        sequelize,
        modelName: 'Tareas',
        tableName: 'tareas'
    }
)