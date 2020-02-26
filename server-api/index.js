/**
 * Package imports
 */
const
    morgan = require('morgan'),
    express = require('express'),
    session = require('express-session'),
    uuid = require('uuid/v4'),
    cors = require('cors'),
    cookieParser = require('cookie-parser');

/**
 * Module imports
 */
const { mongoose } = require('./db');


/**
 * Settings
 */
const PORT = 3000;
const app = express();

/**
 * Middleware
 */
app.use(session({
    name: 'sid',
    genid: (req) => {
        console.log('Inside the session middleware');
        console.log(req.sessionID);
        return uuid() // use UUIDs for session IDs
    },
    secret: 'pkrJyzcftqUQQgtFtGeb',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // maxAge: 7200000,
        // sameSite: true, //strict
        secure: true,
        maxAge: 60000
    }
}));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000/', 'http://localhost:3001/']
}));
app.use(morgan('dev'));
app.use(express.json());

/**
 * Routes
 */
app.use('/api', require('./routers/main.router'));

/**
 * Server start
 */
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}/api/`);
});
