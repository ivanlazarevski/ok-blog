const fs = require('fs');
const targetPath = './src/environments/environment.ts';

// This variable is read from process.env, which is set by Vercel
const siteKey = process.env.siteKey || 'default-key-for-local-dev';
const sanityProjectId = process.env.sanityProjectId;
const formSpreeUrl = process.env.formSpreeUrl;

const envConfigFile = `export const environment = {
  production: true,
  siteKey: '${siteKey}',
  sanityProjectId: '${sanityProjectId}',
  formSpreeUrl: '${formSpreeUrl}'
};`;

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(`Successfully generated ${targetPath}`);
  }
});
