# Precious-chatt guide for developer

There is two folders : frontend and backend
Go to the two folders and type `npm install` for download all dependancies necessary for the projects.

The most advanced branches are **<ins>develop</ins>** and **<ins>feature</ins>**.

## Frontend folder

### Environment variables
There is a template of `.env.local` file which is named `.env.local.template`.
You have to renamed the file `.env.local.template` to `.env.local` and complete the variables.

### Available Scripts

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Backend folder

### Environment variables
There is a template of `.env` file which is named `.env.template`.
You have to renamed the file `.env.template` to `.env` and complete the variables.

### Available Scripts

#### `npm start`
Runs the server with nodemon on the port you have defined in the `.env` file.