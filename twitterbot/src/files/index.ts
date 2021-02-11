import fs from 'fs';
import { FILE_NAME } from '../consts';

export const base64Encode = () => fs.promises.readFile(FILE_NAME, { encoding: 'base64' });

export const deleteFile = () => fs.promises.unlink(FILE_NAME);
