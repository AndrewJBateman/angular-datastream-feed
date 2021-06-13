# Angular Datastream Feed

* Angular app that adds a realtime post feed to a website using a [Pusher](https://pusher.com/) channel.
* It includes a simple Node server that will process the posts published by users of the website. The server will perform data validation and will prevent duplication of post titles. It will then publish the post to a Pusher Channel in realtime.
* **Note:** to open web links in a new window use: _ctrl+click on link_

![GitHub repo size](https://img.shields.io/github/repo-size/AndrewJBateman/angular-datastream-feed?style=plastic)
![GitHub pull requests](https://img.shields.io/github/issues-pr/AndrewJBateman/angular-datastream-feed?style=plastic)
![GitHub Repo stars](https://img.shields.io/github/stars/AndrewJBateman/angular-datastream-feed?style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/AndrewJBateman/angular-datastream-feed?style=plastic)

## Table of contents

* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info

* The pusher channel uses a publish/subscribe model so all subscribers to the channel will receive the update. See [Pusher documentation](https://pusher.com/docs) for more information.

## Screenshots

![Example screenshot](./img/dashboard.png)
![Example screenshot](./img/newpost-and-feed.png)

## Technologies

* [Angular framework v11](https://angular.io/)
* [Angular CLI v11](https://cli.angular.io/).
* Real-time communication scalable features added with [pusher-js](https://pusher.com/)
* server backend using [Node.js v14 LTS](https://nodejs.org/en/)

## Setup

### Client setup

* From the directory root, navigate to the client directory with `cd client`.
* Install dependencies with npm install. (Ensure tar v4.4.8 or greater is used)
* in Client directory: type `npm i typescript@4.0.5 --save-dev --save-exact` to avoid compilation error.
* Update src/environment file with your [PUSHER_KEY](https://dashboard.pusher.com/).
* Run app using `ng serve` then navigate to `http://localhost:4200/`.

### Server setup

* From the directory root, navigate to the server directory with `cd server`.
* Install dependencies with npm install.
* Update variables.env file with your [PUSHER_KEY](https://dashboard.pusher.com/).
* Run app using `node index.js` then navigate to `http://localhost:3000/`.

## Code Examples

```typescript
// send request to backend and change info message depending on status.
  submit() {
    this.errorMsg = '';
    this.isSending = true;
    this.infoMsg = 'Processing your request..wait a second';

    this.http
      .post('http://localhost:3000/submit', {
        title: this.title,
        body: this.content,
      })
      .toPromise()
      .then((data: { message: string; status: boolean }) => {
        this.infoMsg = data.message;
        setTimeout(() => {
          this.infoMsg = '';
        }, 1000);

        this.isSending = false;
        this.content = '';
        this.title = '';
      })
      .catch(error => {
        this.infoMsg = '';
        this.errorMsg = error.error.message;

        this.isSending = false;
      });
  }

```

## Features

* When a post is created in the 'new' route it will appear in the 'feed' route, due to the way the Pusher channel is set up.

## Status & To-Do List

* Status: Client and Server dependencies updated, zero vulnerabilities. Client working. Server partially working - compiles but does not show feeds.
* To-Do: fix missing title on dashboard page and add functionality. Correct date format. Add images to placeholder in feed.component.html. Localhost://3000 only shows `{"service": "Pusher activity feed API"}` - investigate why `/submit` does not work.

## Inspiration

* [Lanre Adelowo's tutorial: BUILD A LIVE ACTIVITY FEED WITH ANGULAR 7](https://pusher.com/tutorials/live-feed-angular-7),

## :file_folder: License

* This project is licensed under the terms of the MIT license.

## :envelope: Contact

* Repo created by [ABateman](https://github.com/AndrewJBateman), email: gomezbateman@yahoo.com
