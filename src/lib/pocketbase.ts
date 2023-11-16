import PocketBase from 'pocketbase';

const url = import.meta.env.VITE_POCKETBASE_URL;
const db = new PocketBase(url)

export default db;