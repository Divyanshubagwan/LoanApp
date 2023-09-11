# Hope - Loan App

This  is a basic app, with REST API using MERN stack but not 'React' which consists of 2 roles- admin who can administer the loans status and can grant or disapprove as loan, and
A customer who can Apply for loan and view his/her loan history and make repayment. 
database used here is mongodb, which is accessed using mongoose.
A proper session management is done using mongoose session store , which prevents unauthorised access of users.

Login credentials of admin and customer need to be predefiened/hardcode according to given schema - ".src/models/login.js"
e.g -
{
  "username": "Divyanshu",
  "password": "Divyanshu@123",
  "role": "admin"
}
{
  "password": "Bunny@123",
  "role": "customer",
  "username": "Bunny"
}

to run this application you need to install node, express and mongodb and also need to run npm command in terminal -
"npm init -y"
"npm i express"
"npm i mongoose"
"npm i hbs"
"npm i nodemon"
"npm run dev" // to run the script

url - localhost:3000 // hit this url in your browser to start the app.
