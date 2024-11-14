# Tick Event
## Book your event

## Project Overview
An event planning application that helps you organize and manage events efficiently.

## Features
- register user.
- sign in user.
- Create and manage events.
- edit events.
- create rooms details.
- create speaker with details.
- Book event ticket.

## Technologies Used
- Node.js
- Express.js
- MongoDB, Mongoose
- `multer` for file uploads
- `i18n` for translation.
- `express-validator` for validating request errors.
- `jsonwebtoken` for authentication.

## Installation
1. Clone the repository: `git clone `
2. Install dependencies: `npm install`
3. Set up environment variables in `.env`
    JWTKEY=randomstring
4. add data base named **tick-events** in mongo db
4. Run the app: `npm run serve`

## Usage
- **Create events** and manage guest lists.
- **Edit event**
- **Book events by user**

## API Documentation
- `POST /api/events`: Create a new event
- `GET /api/events`: Get all events
- Documentation link: [postman documentation](https://documenter.getpostman.com/view/12984962/2sAY4vi3mX)


