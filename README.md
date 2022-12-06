# ChatRooms
A simple chat rooms website

## Preview


## Prerequisites
  - you should ensure that your local machine has PHP and [Composer](https://getcomposer.org/) installed. for more information visit [laravel docs](https://laravel.com/docs/9.x/installation)
  - Make sure your local machine has [Nodejs](https://nodejs.org/) installed.
  
## Clone & install

* Clone this repo

* Run `cd chat-room` to change directory

* Run `cp .env.example .env` to create .env file from ".env.example"

* Make sure to create a new database and add your database credentials to your .env file

  ```
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=database_name
  DB_DATABASE_TEST=database_name_test
  DB_USERNAME=root
  DB_PASSWORD=
  ```
* Run `composer install`

* Run `npm install`

* Run `php artisan key:generate`

* Run `php artisan migrate` to create database tables

* Now if you want to add some random data to your database for test purposes run `php artisan db:seed`
 
* Now if you want to enable the realtime features "broadcasting", you should set pusher credentials in .env
   
  >you can create an account and get these credentials from [here](https://pusher.com/)
  
  ```
  PUSHER_APP_ID=
  PUSHER_APP_KEY=
  PUSHER_APP_SECRET=
  PUSHER_APP_CLUSTER=
  ```

* Run `php artisan serve` to start the server

### If you did run `php artisan db:seed`, you can login using this credentials

  >**username:** `admin`   
  >**password:** `password`
