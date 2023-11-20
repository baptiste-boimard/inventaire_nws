require(`dotenv`).config();

const { Pool } = require(`pg`);

// Créer un nouvau pool de connexion
const client = new Pool({
  connectionString: process.env.URL_DATABASE,
  ssl: {
    ssl: false,
  },
});

client.connect();

export default client;
