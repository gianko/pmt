export const countPosts = (): Promise<number> => Promise.resolve(0);

export const savePost = ({ id_str }: { id_str: string }): Promise<void> => Promise.resolve();

export const handleError = (error: string): Promise<void> => {
  // tslint:disable-next-line no-console
  console.error(error);
  return Promise.resolve();
}
