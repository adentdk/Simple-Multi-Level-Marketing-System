# Simple Multi Level Marketing System
This application was developed using ExpressJS technology to build the backend, with Sequelize as the ORM to facilitate access to the database.
## Project Structure

```
├── app.js 
├── bin
│   └── www
├── client
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── components
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── pages
│   │   │   ├── Home
│   │   │   │   ├── components
│   │   │   │   │   ├── AddNewMember.jsx
│   │   │   │   │   ├── CalculateBonus.jsx
│   │   │   │   │   ├── MemberTreeView.jsx
│   │   │   │   │   └── MigrateMember.jsx
│   │   │   │   ├── Home.jsx
│   │   │   │   └── index.js
│   │   │   └── Login
│   │   │       ├── index.js
│   │   │       └── Login.jsx
│   │   └── routes
│   │       └── index.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
├── docs
│   └── Sistem Multi Level Marketing Sederhana.postman_collection.json
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── config
│   │   └── db-config.json
│   ├── controllers
│   │   ├── authV1.js
│   │   ├── errorController.js
│   │   ├── memberV1.js
│   │   └── schemas
│   │       ├── authV1.js
│   │       └── memberV1.js
│   ├── middlewares
│   │   ├── errorHandler.js
│   │   ├── mustLogin.js
│   │   └── validateSchema.js
│   ├── migrations
│   │   ├── 20230419095748-create-table-user.js
│   │   ├── 20230419100241-create-table-role.js
│   │   ├── 20230419100343-alter-table-user-add-role-references.js
│   │   └── 20230419100550-create-table-member.js
│   ├── models
│   │   ├── index.js
│   │   ├── _member.js
│   │   ├── _role.js
│   │   └── _user.js
│   ├── routes
│   │   └── apiV1.js
│   ├── seeders
│   │   ├── 20230419113245-insert-role.js
│   │   ├── 20230419120246-insert-users.js
│   │   └── 20230419120653-insert-members.js
│   └── utils
│       ├── jwt.js
│       ├── password.js
│       ├── response.js
│       └── sequelize.js
└── template.env
```

## How to run server locally
Make sure Node.js V18.16.0 is installed on the local computer. If not, download and install Node.js from https://nodejs.org/.
### Steps
- Clone or download the project repository and navigate to the repository folder.
  ```
  git clone [repository_url]
  cd [repository_name]
  ```
- Install the dependencies using the following command:
  ```
  npm install
  ```
- Create a new file named .env by copying the contents of template.env and updating the values according to your local environment.
- Run the following command ti run database migrations:
  ```
  npx sequelize db:migrate
  ```
- Run the following command to seed the database with initial data:
  ```
  npx sequelize db:seed:all
  ```
- Start the development server using the following command:
  ```
  npm run dev
  ```
That's it! You should now be able to access the API at http://localhost:3000/. You can test it using Postman by first importing the file in:
```
  docs/******.postman_collection.json
```
You can also try it out using a simple web application that we have prepared. Follow these instructions to run the simple web application that we have prepared locally.
- Navigate to client folder:
  ```
  cd client
  ```
- Install the client dependencies using the following command:
  ```
  npm install
  ```
- Start the development server using the following command:.
  ```
  npm run dev
  ```
  
And the web application can be accessed at http://localhost:5173/.
## Conclusion:
this documentation provides a brief overview of the project structure, how to set up and run the project locally, and how to access the API and web application. We hope this documentation has been helpful in understanding the project and getting started with it. Feel free to contribute to the project and submit any issues or feedback.