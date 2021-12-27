# CCAPDEV machine project
Welcome to group 56's repository. Our project is to create an Instagram-esque website that's DLSU PUSA-themed—aptly named "**catsallian**"!

![alt text](catsallian.png "Welcome to a world of cats")

## Hw to run things (on local machine)
1. Run cmd on this project's main directory
2. Enter the command `npm install`
3. Wait to install all of the website's dependencies
4. Run `npm audit fix` if asked
5. Enter the command `node server.js`
6. Go to `localhost:3000` via your browser
7. Done! Enjoy the website!

## How to run things (via Heroku with me)
1.  Simply go to `catsallian.herokuapp.com` when the server is on and enjoy :) `note: website has been deactivated as of 2021`
 
## How to run things (via Heroku manually)
1. Make sure the website's properties are properly setup before deployment
2. Set up Heroku's config vars via Settings tab, Make sure that the Config Vars are:

	`MONGODB_URI` : `mongodb+srv://admin:adminpassword@cluster0.h1c1r.mongodb.net/catsallian-database?retryWrites=true&w=majority`

	`NODE_ENV` : `Production`

	`TZ` : `Asia/Singapore`


![alt text](configvars.png "Proper config vars settings")

3. Fork the project via `https://github.com/DLSU-CCAPDEV/2021T2-G56`
4. At the deploy tab, connect to your Github account and connect to said forked reppo

![alt text](connecttorepo.png "Make sure you're connected to the right forked repo!")

5. Press `Deploy branch` and wait for the setup to finish.

![alt text](deploy.png "Press deploy for some fun!")

6. Enter `catsallian.herokuapp.com` and enjoy the the site!

## Test accounts you can use!
Because the website comes with pre-loaded content, you can even access a few accounts. Feel free to check them out!
| email | password |
|-------|-----------|
| alex@gmail.com  | alexpassword  |
| betty@gmail.com | bettypassword    |
| carla@gmail.com  | carlapassword  |
| danny@gmail.com | dannypassword |
| enrico@gmail.com  | enricopassword  |
| frank@gmail.com  | frankpassword  |

You can also create your own account, which will generate a default profile picture for you until you have it changed via the settings!

## Project dependencies
- **bcryptjs:** for encrypting your password and making sure your security is in tip-top shape
- **body-parser**
- **dotenv**
- **ejs:** javascript + html = happiness and also lots of bugs
- **express**
- **express-session:** makes sure you stay logged in!
- **multer**
- **nodemon:** for debugging purposes
- **async, express-fileupload, and googleapis:** used for asynchrnous activities like uploading large images. yup, the images are all stored on the cloud!