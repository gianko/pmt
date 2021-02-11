require('dotenv').config(); // tslint:disable-line no-var-requires
import cron from 'node-cron';
import { createFrame } from "./ffmpeg";
import { uploadFile, updateTweetWithMedia } from './twitter';
import { base64Encode } from './files';
import { MOVIE_FRAMES } from "./consts";
import { countPosts, handleError, savePost } from "./db";
import { frameFromIndex } from "./utils";

const tweet = () => {
  countPosts().then((index) => {
    const frame = frameFromIndex(index);
    console.log({index, frame});
    const updateStatus = ({ media_id_string }: { media_id_string: string }) => updateTweetWithMedia(`cuadro ${frame + 1} de ${MOVIE_FRAMES + 1}`, media_id_string);

    return createFrame(index)
      .then(base64Encode)
      .then(uploadFile)
      .then(updateStatus)
      .then(savePost)
  }).catch((error) => {
    handleError(error);
    setTimeout(tweet, 3000);
  });
}

cron.schedule('*/30 * * * *', tweet);
