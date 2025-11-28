const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({ path: 'src/.env' });

// Instead of using process.env directly in the Angular file, use import.meta.env
const envFile = `export const environment = {
    siteKey: import.meta.siteKey,
    production: false
};
`;

const targetPath = path.join(__dirname, './src/environments/environment.development.ts');

fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(successColor, `${checkSign} Successfully generated environment.development.ts`);
  }
});
