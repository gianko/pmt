const sqlite3 = require('sqlite3').verbose();

export const openDB = (): Promise<any> => new Promise((resolve, reject) => {
  const db = new sqlite3.Database('../papitadb', (err: any) => {
    if (err) return reject(err);
    return resolve(db);
  })
});

export const countPosts = (): Promise<number> => new Promise((resolve, reject) => {
  openDB().then((db) => {
    db.get('SELECT COUNT(*) FROM post', [], (err: any, res: any) => {
      console.log({ err, res });
      db.close();
      if (err) reject(err);
      return resolve(res['COUNT(*)'] as number);
    });
  }).catch(reject);
});

export const savePost = ({ id_str }: { id_str: string }): Promise<void> => new Promise((resolve, reject) => {
  openDB().then((db) => {
    db.run(
      'INSERT INTO post (tweet_id, timestamp) VALUES ($id, $date)',
      { $id: id_str, $date: Date.now() },
      (err: any) => {
        db.close();
        if (err) return reject(err);
        return resolve();
      });
  }).catch(reject);
});


export const handleError = (error: string, index: number = 0): Promise<void> => new Promise((resolve, reject) => {
  openDB().then((db) => {
    db.run(
      'INSERT INTO error (timestamp, index_number, error) VALUES ($date, $index, $error)',
      {
        $date: Date.now(),
        $error: error,
        $index: index,
      },
      (err: any) => {
        db.close();
        // tslint:disable-next-line no-console
        console.error(error);
        if (err) return reject(err);
        return resolve();
      });
  }).catch(reject);
});
