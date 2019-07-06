const session = require('express-session');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const TWO_HOURS = 1000 * 60 * 60 * 2;
const port = process.env.PORT || 4000;
const userRoutes = express.Router();
const SESS_LIFETIME = TWO_HOURS;
const SESS_NAME = 'sid';
const SESS_SECRET = 'cookiesecret';
const MongoStore = require('connect-mongo')(session);

const NODE_ENV = 'development';

const IN_PROD = NODE_ENV === 'production';

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);
app.use(bodyParser.json());

let User = require('./userModel');
mongoose.connect(
  process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/users',
  { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Mongo DB Connection Est. Yay!!');
});

userRoutes.route('/').get((req, res) => {
  const userId = req.session.userId;
  console.log('AA', req.session);
  if (!userId) {
    res.json({ data: 'LOGIN' });
  } else {
    console.log(userId);
    res.json({
      data: 'LOGGEDIN',
      userId: userId,
      name: req.session.name,
      profilepic: req.session.profilepic
    });
  }
});

userRoutes.route('/login').post((req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    // In case the user not found
    if (err) {
      console.log('THIS IS ERROR RESPONSE');
      res.json(err);
    }
    if (!user) {
      console.log('Not Found');
      res.json({ data: 'NOTFOUND' });
    } else if (user && user.password === req.body.password) {
      console.log('PASS');
      req.session.userId = user._id;
      req.session.name = user.name;
      req.session.profilepic = user.profilepic;
      req.session.save(() => {
        res.json({ data: 'PASS', user: user, sessionID: req.session.id });
      });
    } else {
      console.log('Credentials wrong');
      res.json({ data: 'INVALID' });
    }
  });
});

userRoutes.route('/add').post((req, res) => {
  //TODO ADD MULTIPLE USER ACCOUNT CHECK
  let user = new User(req.body);
  user
    .save()
    .then(user => {
      res.status(200).json({ user: 'user Added' });
    })
    .catch(err => {
      res.status(400).send('Adding Failed', err);
    });
});

userRoutes.route('/logout').get((req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.json({ data: 'ERR' });
    }
    res.clearCookie(SESS_NAME);
    res.json({ data: 'LOGIN' });
  });
});

app.use(
  session({
    name: SESS_NAME,
    resave: true,
    saveUninitialized: false,
    secret: SESS_SECRET,
    store: new MongoStore({ mongooseConnection: connection }),
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: IN_PROD
    }
  })
);

app.use('/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Started @ ${port}`);
});
