var publishCst = require('constants/PublishConst');

var normalArticleStoreInit = {
    type: 'normal',
    title: '',
    contents: [],
    tags: []
};

var markdownArticleStoreInit = {
    type: 'markdown',
    title: '', // 标题
    brief: '', // 简介
    content: '',  // markdown源码。存源码而非转后的html主要是为了后面的编辑功能
    tags: []
};

var richTextArticleStoreInit = {
    type: 'richText',
    title: '',
    brief: '',
    content: '',
    tags: []
};


var initState = {
    publishType: null, // 发布类型
    layout: {
        publishTypes: [
            {
                path: '/publish/normal',
                title: '发表普通文章',
                type: 100,
                text: '普通',
                className: 'normal'
            },
            {
                path: '/publish/richtext',
                title: '发表富文本',
                type: 200,
                text: '富文本',
                className: 'richtext'
            },
            {
                path: '/publish/markdown',
                title: '发表markdown',
                type: 300,
                text: 'markdown',
                className: 'markdown'
            }
        ]
    },

    post: JSON.parse(JSON.stringify(normalArticleStoreInit)),

    // markdown
    markdown: JSON.parse(JSON.stringify(markdownArticleStoreInit)),

    // richtext
    richText: JSON.parse(JSON.stringify(richTextArticleStoreInit))
};

module.exports = function testReducers (state, action) {
    var contents,
        markdown,
        richText,
        post;

    state = state || initState;

    window.rerenderPublish = false;

    contents = state.post.contents;
    post = state.post;
    markdown = state.markdown;
    richText = state.richText;

    switch (action.type) {
        case publishCst.SELECT_PUBLISH_TYPE:
            return Object.assign({}, state, {
                publishType: action.publishType
            });

        case publishCst.NORMAL_ADD_PARAGRAPH:

            contents.push({
                type: action.codeType,
                value: action.codeValue,
                index: contents.length
            });

            window.rerenderPublish = true;

            return Object.assign({}, state, {
                post: post
            });

        case publishCst.NORMAL_DELETE_PARAGRAPH:
            window.rerenderPublish = true;

            post.contents = contents.filter(function (content) {
                return content.index !== action.index;
            });

            return Object.assign({}, state, {
                post: post
            });

        case publishCst.NORMAL_TITLE_CHANGE:
            post.title = action.title;

            return Object.assign({}, state, {
                post: post
            });

        case publishCst.NORMAL_CONTENT_CHANGE:
            contents = contents.filter(function (content) {
                if(content.index === action.index) {
                    content.value = action.content;
                }

                return content;
            });

            post.contents = contents;

            return Object.assign({}, state, {
                post: post
            });

        case publishCst.MARKDOWN_CONTENT_CHANGE:
            markdown.title = action.title;
            markdown.brief  = action.brief;
            markdown.content = action.markdown;

            return Object.assign({}, state, {
                markdown: markdown
            });

        case publishCst.RICHTEXT_TITLE_CHANGE:
            richText.title = action.title;

            return Object.assign({}, state, {
                richText: richText
            });

        case publishCst.RICHTEXT_CONTENT_CHANGE:
            richText.content = action.content;
            richText.brief = action.brief;

            return Object.assign({}, state, {
                richText: richText
            });

        case publishCst.NORMAL_TAGS_CHANGE:
            window.rerenderPublish = true;
            post.tags = action.tags;

            return Object.assign({}, state, {
                post: post
            });

        case publishCst.MARKDOWN_TAGS_CHANGE:
            markdown.tags = action.tags;

            return Object.assign({}, state, {
                markdown: markdown
            });

        case publishCst.RICHTEXT_TAGS_CHANGE:
            richText.tags = action.tags;

            return Object.assign({}, state, {
                richText: richText
            });


        case publishCst.RESET_NORMAL_ARTICLE:

            return Object.assign({}, state, {
                post: JSON.parse(JSON.stringify(normalArticleStoreInit))
            });

        case publishCst.RESET_ARTICLE:

            return Object.assign({}, state, {
                post: JSON.parse(JSON.stringify(normalArticleStoreInit)),
                markdown: JSON.parse(JSON.stringify(markdownArticleStoreInit)),
                richText: JSON.parse(JSON.stringify(richTextArticleStoreInit))
            });

        // 设置要编辑的文章id
        case publishCst.SET_EDIT_ARTICLE_ID:

            if (action.articleType === 100) {
                post.id = action.articleId;

                return Object.assign({}, state, {
                    post: post
                });

            } else if(action.articleType === 200) {
                richText.id = action.articleId;

                return Object.assign({}, state, {
                    richText: richText
                });
            } else {
                markdown.id = action.articleId;

                return Object.assign({}, state, {
                    markdown: markdown
                });
            }

        default:
            return state;
    }
};
