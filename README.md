# Frankly-Blogging

## Description

A blog site to hold the ramblings of myself and fellow web developers. This is a full stack application built using Handlebars.js as the templating language, Sequelize for the ORM, and utilizes the express-session npm package for user authentication. Users can must create accounts in order to post and view comments. All posts are displayed in a thread on the homepage.

[Keep it frank.](https://polar-eyrie-98965.herokuapp.com/)
![Screenshot of home page](https://github.com/MaxFrank13/Frankly-Blogging/blob/main/public/assets/home-screen.png)

The app can reached at the above link but if you'd like to clone the repository and set it up for yourself, follow the directions below.

## Installation

    - Clone this repository to receive all of the files
    - Set up your environment variables in a .env file
    - Run "npm install" in the command line of your terminal to set up all of the dependencies
    - Initialize your database by running the "schema.sql" file with MySQL
    - There is no seed data provided for this app
    - Run "node server.js" to start the application's connection
    - Go to the url of the application (http//:localhost:3001) and you'll see it running
    
 ## Using the app

 
 ### Creating an account
 Before making posts or comments, a user must create an account. Click the login link in the navigation bar and then click the sign up button and you'll be presented a form for your account information. You can only create one account per email. Once you have an account, you'll be brought to your personal dashboard.
 
![Screenshot of log in](https://github.com/MaxFrank13/Frankly-Blogging/blob/main/public/assets/login-screen.png)

 ### Dashboard
 Here you are given the option to make new posts. Once you have posts, they will appear here as well and you will be given options to edit them or view their comments. Posts can be deleted from the editting inferface.
 
![Screenshot of dashboard](https://github.com/MaxFrank13/Frankly-Blogging/blob/main/public/assets/dashboard-screen.png)

 ### Comments
 Comments are displayed with the newest one at the top while also including the date created and the author's name. Posts and their comments can be viewed without an account.
 
![Screenshot of forum](https://github.com/MaxFrank13/Frankly-Blogging/blob/main/public/assets/forum-screen.png)
 
