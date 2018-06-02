# BamazonDB
BamazonDB is an amazon like storefront. A basic node.js and MySQL CLI

---
## :mag: Table of contents :mag:

### [1-Description](https://github.com/DrWood89/BamazonDB#1-description-page_facing_up)
### [2-Technologies](https://github.com/DrWood89/BamazonDB#2-technologies-computer)
### [3-Challenges](https://github.com/DrWood89/BamazonDB#3-challenges)
### [4-Future Updates](https://github.com/DrWood89/BamazonDB#4-future-updates)
### [5-Preview Video Links](https://github.com/DrWood89/BamazonDB#5-preview-video-links)

---
### 1-Description :page\_facing\_up:

- This node.js and MySQL CLI allows you As a Customer to 
   - Purchase item of interest
   - Amount desired using their item_id. 
   
- As a Manager it allows you to
   - Display Current Inventory
   - Display Low Inventor
   - Update, Add or Delete a product through a series of GET, POST, UPDATE and DELETE methods.
    
All of this data is stored in a local MySQL database.
   
This Node.js is intented showcase the ability to work with a MySQl database to store data and 
build a node.js CLI allows us to communicate with the database and manipulate the data as we please.

---
### 2-Technologies  :computer:
   
The following technologies made it possible to bring that project into life
   
- JavaScript
- [MySQL](https://www.mysql.com/)
- [Node.js](https://nodejs.org/en/)
- Node packages:
  - [mysql](https://www.npmjs.com/package/mysql)
  - [inquirer](https://www.npmjs.com/package/inquirer)
  
---
### 3-Challenges 

Some of the challenges encountered building this project was working with MySQL. instead of using schemas
and seeds i went the hard way and use a list of dummy data created in excel to populate the table in my 
database. I kept getting depricated error wneh
i run the app because it was trying to take action before recieving data from the database and that's when 
i figured me and callbacks could be bests of friends. I struggled with getting live updates from my database like update as the action is happening 
and with also incorporate the third part of the App which the Supervisor view.

---
### 4-Future Updates

As future development i would like to incorporate a Supervisor View that oversees both Customer
and Manager View. It would
- Give access to all departments
- create new Departments
- Being able to view business progress and growth like How much money invested, sold for, expenses and 
  benefits
- Also make the use of npm colors and npm CLI-table to beautify the terminal view.

---
### 4-Preview Video Links

#example link to bamazonCustumer.js
https://drive.google.com/file/d/1YLe-dRgGjolQrIUBwFXwXyUl_-nJeRx7/view?usp=sharing

#example link to bamazonManager.js
https://drive.google.com/file/d/1U-I4muenIqd4vjjzS8hKgxvkxw9VEaV7/view?usp=sharing
