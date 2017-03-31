var thunk = require('redux-thunk');

var Redux = require('redux');
var createStore = Redux.createStore;
var combineReducers = Redux.combineReducers;
var applyMiddleware = Redux.applyMiddleware;
var compose  = Redux.compose;

var interceptor = require('middlewares/interceptor');
var ArticleReduces = require('reducers/ArticleReduces');
var PublishReduces = require('reducers/PublishReduces');
var TipReduces = require('reducers/TipReduces');
var TagReduces = require('reducers/TagReduces');
var LoginReduces = require('reducers/LoginReduces');

var store = createStore(
    combineReducers({
        Test: function () {
            return {
                msg: '这是一个测试store, 一个函数'
            };
        },
        Article: ArticleReduces,
        Publish: PublishReduces,
        Tip: TipReduces,
        Tag: TagReduces,
        Login: LoginReduces
    }),
    compose(
        applyMiddleware(interceptor),
        window.devToolsExtension ? window.devToolsExtension() : function (f) { return f;}
    )
);

module.exports = store;
