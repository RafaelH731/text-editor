import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database

//export const putDb = async (content) => console.error('putDb not implemented');

console.log('PUT to the database');
//creates connection
  const jateDb = await openDB('jate', 1);
  //transaction that allows jate and readwrite
  const tx = jateDb.transaction('jate', 'readwrite');
  //objectstore
  const store = tx.objectStore('jate');
  //put update
  const request = store.put({ id: 1, value: content });
  //result
  const result = await request;
  console.log('🚀 - data saved to the database', result);

// TODO: Add logic for a method that gets all the content from the database

//export const getDb = async () => console.error('getDb not implemented');

export const getDb = async () => {
  console.log('GET all from the database');
  //creates connection
  const jateDb = await openDB('jate', 1);
  //transaction that allows jate and readonly
  const tx = jateDb.transaction('jate', 'readonly');
  //objectstore
  const store = tx.objectStore('jate');
  //getall update
  const request = store.getAll();
  //result
  const result = await request;
  console.log('result.value', result);
  return result[0].value;
};


initdb();
