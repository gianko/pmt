/* tslint:disable variable-name */
import Twitter from "twitter-lite";

const consumer_key = process.env.CONSUMER_KEY as string;
const consumer_secret = process.env.CONSUMER_SECRET as string;
const access_token_key = process.env.ACCESS_TOKEN_KEY as string;
const access_token_secret = process.env.ACCESS_TOKEN_SECRET as string;

const config = {
  version: "1.1",
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret,
};

const clientAPI = new Twitter({
  ...config,
  subdomain: "api",
});

const clientUpload = new Twitter({
  ...config,
  subdomain: 'upload',
});


export const uploadFile = (media_data: string): Promise<{media_id_string:string}> => clientUpload.post('media/upload', { media_data })

export const updateTweetWithMedia = (status: string, media_id_string: string): Promise<{id_str:string}> => clientAPI.post('statuses/update', { status, media_ids: [media_id_string] })
