import fs from 'fs';
import path from 'path';

type Errors = {
  [index: string]: ErrorMessagesType;
};

export type ErrorMessagesType = {
  message: string;
  type: string;
  description: string;
};

const errors = JSON.parse(fs.readFileSync(path.join(__dirname, 'api_errors.json')).toString());

export const errorStatus: Errors = errors;
