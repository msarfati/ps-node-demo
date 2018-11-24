const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'my-cookies' }));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  {
    title: 'Book',
    link: '/books'
  },
  {
    title: 'Author',
    link: '/authors'
  }
];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);
// const adminRouter = require('./src/routes/adminRoutes')(nav);

app.use('/books', bookRouter);
app.use('/auth', authRouter);
// app.use('/admin', adminRouter);

app.get('/', (req, res) => res.render(
  'index',
  {
    nav,
    title: 'Library'
  }
));

app.listen(port, () => debug(`listening on port ${chalk.green(port)}`));
