import { chat_box_connec } from '../connection/chat_box';
import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';


class Chat_box extends Model<InferAttributes<Chat_box>, InferCreationAttributes<Chat_box>> {
    declare id_pqr: string | null;
    declare fecharegistro: Date;
    declare nombre_cliente: string;
    declare telefono: string;
    declare telefono_chat: string;
    declare id_clase_solicitud: number;
    declare email: string;
    declare ciudad: string;
    declare producto: string;
    declare oficina: string;
    declare descripcion: string;
    declare enviado: string;
    declare tdatosacept: string;
    declare cedula: number | null;
}

const initChatBoxModel = (zona: string) => {
    const empresa = zona === '39627' ? 'pqryumbo' : 'pqrjamundi';
    Chat_box.init({
        id_pqr: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        fecharegistro: { type: DataTypes.DATE, allowNull: false },
        nombre_cliente: { type: DataTypes.STRING(200), allowNull: false },
        telefono: { type: DataTypes.STRING(50), allowNull: false },
        telefono_chat: { type: DataTypes.STRING(50), allowNull: false },
        id_clase_solicitud: { type: DataTypes.INTEGER, allowNull: false },
        email: { type: DataTypes.STRING(100), allowNull: false },
        ciudad: { type: DataTypes.STRING(50), allowNull: false },
        producto: { type: DataTypes.STRING(100), allowNull: false },
        oficina: { type: DataTypes.STRING(150), allowNull: false },
        descripcion: { type: DataTypes.TEXT, allowNull: false },
        enviado: { type: DataTypes.STRING(1), allowNull: false },
        tdatosacept: { type: DataTypes.STRING(10), allowNull: false },
        cedula: { type: DataTypes.INTEGER(), allowNull: true },
    }, {
        sequelize: chat_box_connec,
        tableName: empresa,
        timestamps: false
    });
};
export { Chat_box, initChatBoxModel };