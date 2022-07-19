const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const root = require('./graphql');
const common = require('./common/common');

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type History {
    sha:String
    message : String
    url : String
    commiterEmail : String
    commitDate : String
  }

  type Query {
    reactCommitHistory(page:Int!,token:String): [History!]
    getCountriesByCategory : String
    helloWorld : String!
  }
`);

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.get('/generateToken',(req,res)=> {
  let token = common.generateAPIKey();
  res.send(token);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});



module.exports = app;
