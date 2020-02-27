/**
 * Package imports
 */
const
    morgan = require('morgan'),
    express = require('express'),
    session = require('express-session'),
    uuid = require('uuid/v4'),
    cors = require('cors');

/**
 * Module imports
 */
const {mongoose} = require('./db');


/**
 * Settings
 */
const PORT = 5000;
const app = express();

/**
 * Middleware
 */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3001/', 'http://localhost:3002']
}));
app.use(session({
    name: 'sid',
    genid: () => {
        return uuid() // use UUIDs for session IDs
    },
    secret: 'pkrJyzcftqUQQgtFtGeb',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 60000
    }
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
