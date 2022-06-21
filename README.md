# Social Media Plattform (work in progress)

## Table of Content

-   [THE PROJECT](#the-project)
-   [DEVELOPER ROADMAP](#roadmap)

## The Project <a href="the-project"></a>

During bootcamp at Spiced Academy we had to create a social media platform in [React.js](https://reactjs.org/) within 2 weeks. The project covered the handling of class- and functional components, as well as the use of [Redux.js](https://redux.js.org/) and websockets, in this case [Socket.io](https://socket.io/). We used [Express.js](https://expressjs.com/) on the server side and [PostgreSQL](https://www.postgresql.org/) for the database.

The most important features of the web application are a global chat, the function to search for users and add or remove them as friends. Of course there is a user login and a profile page where you can upload a profile photo and write a short text about yourself. Additionally I added an online user list to the global chat.

For the layout I was inspired by my favorite social media platform [Discord](https://discord.com). Because the main functionality of Discord is creating servers and chat rooms, as well as the possibility for private chat. I would like to add these in future. In any case, the code needs a complete revision and conversion to functional components. Because of the time pressure, the structuring of the CSS is a mess. The template provided by the academy works with an outdated version of React.js. The module bundler in [Webpack.js](https://webpack.js.org) is also deprecated and contains many packages that are deprecated. I used a version of the template that I updated for the [Stones Project](https://github.com/sirPixieJerry/stones_project) and adapted Webpack to my needs accordingly. Because of many syntax changes in from React 3 to React 4 and 5 this project even needs a complete restart. However, I'd like to leave this project here to demonstrate my experiences with React.

A live demo on Heroku is currently not available.

### DEVELOPER ROADMAP <a name="roadmap"></a>

-   [x] user registration and login
-   [x] profile picture upload
-   [x] user profile with feature to add a bio
-   [x] feature to view other user profiles
-   [x] show recent users (needs to be removed in future versions)
-   [x] usersearch
-   [x] feature to send friend requests and add or remove friends
-   [x] list of online users
-   [ ] restore password via email
-   [ ] add more functionality and logic to chat messages
-   [ ] feature to create threads from chat messages
-   [ ] feature to react with emojis to chat messages
-   [ ] feature to post pictures and links to the chat
-   [ ] private chat
-   [ ] create the possibility to join or leave chat servers
-   [ ] create chat server and chat rooms
