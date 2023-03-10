# Introduction

This Flask application is designed to serve as a basic template for building web applications using Flask and SQLite3 database. The application consists of the following files:

- app.py: The main application file that sets up the Flask app and defines the routes

- database.py: The file that contains the implementation of SQLite3 database operations

- user.py: A class file for defining the User model

- company.py: A class file for defining the Company model

- localutils.py: A utilities file that contains useful functions for the application

## Setup

- Clone the repository to your local machine.
- Install the required dependencies using the following command in the terminal:

      pip install -r requirements.txt

## Usage

To start the application, run the following command in the terminal:

    python app.py

You can access the APIs via http://localhost:5000 and it's endpoints

- /companies : List companies (GET)
- /company/<company_id> : Get a specific company by ID (GET) or Update a company (PUT) or Delete a company (DELETE)
- /company : Create a company (POST)
- /user_company/<user_id> : Add users to a company (POST)
- /user_company/<user_id>: Remove users from a company (DELETE)
- /users : List users (GET)
- /user/<user_id> : Get a specific user by ID (GET) or Update an user (PUT) or Delete an user (DELETE)
- /user : Create an User (POST)
- /user/<user_id>/deactivation : Deactivate an user (PUT)
