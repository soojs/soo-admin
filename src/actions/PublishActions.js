var publishCst = require('constants/PublishConst');

// 选择发布文章类型
module.exports.selectPublishType = function (publishType) {
    return {
        type: publishCst.SELECT_PUBLISH_TYPE,
        publishType: publishType
    }
};

// 发布普通文章
module.exports.publishNormalArticle = function (article) {
    return {
        type: publishCst.SELECT_PUBLISH_TYPE,
        publishType: publishType
    }
};

module.exports.setNormalArticleTitle = function (title) {
    return {
        type: publishCst.SELECT_PUBLISH_TYPE,
        title: title
    }
};

// 新增段落
module.exports.addParagraph = function (codeType, codeValue) {
    return {
        type: publishCst.NORMAL_ADD_PARAGRAPH,
        codeType: codeType,
        codeValue: codeValue || ''
    }
};

// 删除段落
module.exports.deleteParagraph = function (index) {
    return {
        type: publishCst.NORMAL_DELETE_PARAGRAPH,
        index: index
    }
};

module.exports.titleChange = function (title) {
    return {
        type: publishCst.NORMAL_TITLE_CHANGE,
        title: title
    }
};

module.exports.contentChange = function (index, content) {
    return {
        type: publishCst.NORMAL_CONTENT_CHANGE,
        index: index,
        content: content
    }
};

module.exports.markdownContentChange = function (markdown) {
    return {
        type: publishCst.MARKDOWN_CONTENT_CHANGE,
        title: markdown.title,
        brief: markdown.brief,
        markdown: markdown.markdown
    }    
};

module.exports.richTextTitleChange = function (title) {
    return {
        type: publishCst.RICHTEXT_TITLE_CHANGE,
        title: title
    }
};

module.exports.richTextContentChange = function (richText) {
    return {
        type: publishCst.RICHTEXT_CONTENT_CHANGE,
        brief: richText.brief,
        content: richText.content
    }
};

module.exports.normalTagsChange = function (tags) {
    return {
        type: publishCst.NORMAL_TAGS_CHANGE,
        tags: tags
    }
};

module.exports.markdownTagsChange = function (tags) {
    return {
        type: publishCst.MARKDOWN_TAGS_CHANGE,
        tags: tags
    }
};

module.exports.richTextTagsChange = function (tags) {
    return {
        type: publishCst.RICHTEXT_TAGS_CHANGE,
        tags: tags
    }
};

// 重置普通文章数据
module.exports.resetNormalArticle = function () {
    return {
        type: publishCst.RESET_NORMAL_ARTICLE
    }
};

// 重置所有文章数据
module.exports.resetArticle = function () {
    return {
        type: publishCst.RESET_ARTICLE
    }
};

module.exports.setEditArticleId = function (articleType, articleId) {
    return {
        type: publishCst.SET_EDIT_ARTICLE_ID,
        articleType: articleType,
        articleId: articleId
    }
};