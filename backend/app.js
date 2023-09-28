const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();
const routes = require('./routes');
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());


// Security Middleware
if (!isProduction) {             // only when NOT in production
  app.use(cors());
}

app.use(
  helmet.crossOriginResourcePolicy({    // helmet helps set a variety of headers to better secure your app
    policy: "cross-origin"
  })
);

app.use(           // Set the _csrf token and create req.csrfToken method
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

app.use(routes);
module.exports = app;   // exports the app.js
