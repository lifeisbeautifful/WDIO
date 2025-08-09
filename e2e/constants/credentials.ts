import * as dotenv from 'dotenv';
dotenv.config();

export const STANDART_USERNAME = process.env.STANDART_LOGIN as string;
export const PASSWORD = process.env.PASSWORD as string;