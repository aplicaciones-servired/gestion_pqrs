import { Sequelize } from 'sequelize';

const DB_NAME_CHAT = process.env.DB_NAME_CHAT as string
const DB_USER_CHAT = process.env.DB_USER_CHAT as string
const DB_PASS_CHAT = process.env.DB_PASS_CHAT as string
const DB_HOST_CHAT = process.env.DB_HOST_CHAT as string
const DB_PORT_CHAT = parseInt(process.env.DB_PORT_CHAT as string)
const DB_DIALECT_CHAT = process.env.DB_DIALECT_CHAT as string

const chat_box_connec = new Sequelize(DB_NAME_CHAT, DB_USER_CHAT, DB_PASS_CHAT, {
  host: DB_HOST_CHAT,
  port : DB_PORT_CHAT,
  dialect: DB_DIALECT_CHAT === 'true' ? 'mysql' : 'mariadb',
  timezone: '-05:00',
});

export { chat_box_connec };