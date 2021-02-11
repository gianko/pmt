import { exec } from "child_process";
import { FILE_NAME, MS_PER_FRAMES } from "../consts";
import { msToTime } from "../utils";

export const createFrame = (frame: number):Promise<void> => new Promise((resolve, reject) => {
  const time = frame * MS_PER_FRAMES;
  exec(`ffmpeg -ss ${msToTime(Math.round(time))} -i assets/papitamanitoston.mp4 -frames:v 1 ${FILE_NAME} -loglevel 16 -y`,
    (error: any, _: any, stderr: any) => {
      if (error) {
        return reject(error.message);
      }
      if (stderr) {
        return reject(stderr);
      }

      return resolve();
    });
})
