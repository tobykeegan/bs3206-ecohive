const path = require('node:path');
require('dotenv').config();

function getUrl() {
  const protocol = 'http';
  let url =
    process.env.NODE_ENV == 'development'
      ? 'localhost'
      : 'uniprod1.fyre.ibm.com';
  let port = process.env.PORT || 3000;

  return `${protocol}://${url}:${port}`;
}

module.exports = {
  URL: getUrl(),
  mongo: {
    uri: 'mongodb+srv://ecohive-db.ifnc2nm.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority',
    domain: 'mongodb+srv://ecohive-db.ifnc2nm.mongodb.net',
    queryString:
      'authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority',
    db: process.env.DB_VERSION || 'development',
    clientOptions: {
      tlsCertificateKeyFile: path.resolve(
        process.env.CERT_PATH || './.travis/cert.pem',
      ),
      serverApi: { version: '1', strict: true, deprecationErrors: true },
      name: process.env.NODE_ENV || 'development',
    },
  },
};
