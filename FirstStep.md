# financereact : First step

App Finance in React - 15/02/2025


EXECUTION SERVER + APPLI
=
> node ./api/server.js

> npm start


Create REACT environment
=
Create REACT environment in ROOT :
> npx create-react-app financereact

SERVER
=
Create folder .\api

Copy these files :

>.\.env

>.\api\server.js

>.\api\utils.js

>.\api\queries.js

Installing modules :

> npm install odbc

> npm install dotenv



 APPLI
=

Create folders 
>./src/actions

>./src/components

>./src/containers

>./src/models

>./src/reducers

Copy these files :
>./src/actions/personne.js

>./src/components/affButton.js

>./src/components/personne.js

>./src/components/personneForm.js

>./src/containers/personneContainer.js

>./src/containers/personneFormContainer.js

>./src/models/constante.js

>./src/reducers/reducer.js

Replace files App.js
>./src/App.js

>./src/index.js


Installing modules :
> npm install react-redux

> npm install @reduxjs/toolkit

> npm install react-query

> npm install styled-components

EXECUTION :

> npm start

> npm test

> npm run build



 EXTENSIONS CHROME
=
React Developer Tools

Redux DevTools



TypeScript :
npx tsc --init
-> cela va générer le fichier : tsconfig.json
Vérifier que l'on a les lignes ci-dessous activées pour que les typages manquants soient signalés :
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}

Puis installer les bibliothèques pour typescript
npm install --save-dev typescript @types/node
npm i --save-dev @types/react-dom