# 📝 Keeper (To Do App) like Google Keep
🖐Hi guy. Glad to see you here.
This is a project summarizing all the knowledge and understanding gained from taking the bootcam classes. Exactly it's basic.

## ❗️Information
This project was created to study the basics of React and work with the API from Node.js + Express.js, connecting the database with MongoDB.

## 👌Okey Let's Getting Start

### 📲 Front-End

In the project directory, you have to run

### `npm install`

To install all dependency in packege.json first

and than you can run 
### `npm run start`

to runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### ⚙️ Back-End

In the `project directory > keeper-api` you have to run

### `npm install`

To install all dependency in packege.json also

than you have to create new file `.env` to store database connection string and port number or you can init variable instead.

finally just run

### `node index.js` or `nodemon index.js`

To start Keeper Server.
Server will be run at http://localhost:4000.
you can test via Postman with method `GET` at `http://localhost:4000/api/`
if respond with pain text `Hello guy! this is keeper API.` or console say the same. Exactly it work correctly.