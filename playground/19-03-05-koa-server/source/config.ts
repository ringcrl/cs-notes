import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export interface IConfig {
  MYSQL_PASSWORD: string;
  CS_NOTES_PATH: string;
  STATIC_PATH: string;
  RINGCRL_SERVER_PATH: string;
  PORT: number;
}

const config: IConfig = {
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  CS_NOTES_PATH: process.env.CS_NOTES_PATH,
  STATIC_PATH: process.env.STATIC_PATH,
  RINGCRL_SERVER_PATH: process.env.RINGCRL_SERVER_PATH,
  PORT: +process.env.PORT || 2333,
};

export { config };
