import fs from 'fs';

type Errors = {
  [index: string]: ErrorMessagesType;
};

export type ErrorMessagesType = {
  message: string;
  type: string;
  description: string;
};

const errors = JSON.parse(fs.readFileSync('api_erros.json').toString());

export const errorStatus: Errors = errors;
