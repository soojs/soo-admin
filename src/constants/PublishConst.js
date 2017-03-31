var actionPrefix = 'PUBLISH_';

module.exports = {
    // 请求文章列表
    SELECT_PUBLISH_TYPE: actionPrefix + 'SELECT_PUBLISH_TYPE',
    
    // 发布普通文章
    PUBLISH_NORMAL_ARTICLE: actionPrefix + 'PUBLISH_NORMAL_ARTICLE',
    
    // 新增普通文章段落
    NORMAL_ADD_PARAGRAPH: actionPrefix + 'NORMAL_ADD_PARAGRAPH',

    // 删除普通文章段落
    NORMAL_DELETE_PARAGRAPH: actionPrefix + 'NORMAL_DELETE_PARAGRAPH',
    
    // 普通文章标题发生变化
    NORMAL_TITLE_CHANGE: actionPrefix + 'NORMAL_TITLE_CHANGE',
    
    // 普通文章内容发生变化
    NORMAL_CONTENT_CHANGE: actionPrefix + 'NORMAL_CONTENT_CHANGE',

    NORMAL_TAGS_CHANGE: actionPrefix + 'NORMAL_TAGS_CHANGE',

    // 重置
    RESET_NORMAL_ARTICLE: actionPrefix + 'RESET_NORMAL_ARTICLE',

    RESET_ARTICLE: actionPrefix + 'RESET_ARTICLE',

    // 设置要编辑文章的ID
    SET_EDIT_ARTICLE_ID: actionPrefix + 'SET_EDIT_ARTICLE_ID',




    // ******************** markdown文章start********************
    MARKDOWN_CONTENT_CHANGE: actionPrefix + 'MARKDOWN_CONTENT_CHANGE',
    MARKDOWN_TAGS_CHANGE: actionPrefix + 'MARKDOWN_TAGS_CHANGE',
    // ******************** markdown文章end ********************


    // ******************** richtext文章 start********************
    RICHTEXT_TITLE_CHANGE: actionPrefix + 'RICHTEXT_TITLE_CHANGE',
    RICHTEXT_CONTENT_CHANGE: actionPrefix + 'RICHTEXT_CONTENT_CHANGE',
    RICHTEXT_TAGS_CHANGE: actionPrefix + 'RICHTEXT_TAGS_CHANGE'
    // ******************** richtext文章 end********************

};