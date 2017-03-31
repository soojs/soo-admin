module.exports = {

    /**
     * 检查文章标题是否符合要求
     * @returns {boolean}
     */
    checkArticleTitle: function (title) {
        return title.length >= 5 && title.length <= 50;    
    },

    /**
     * 检查文章内容是否符合要求
     * @returns {boolean}
     */
    checkArticleTContent: function (content) {
        return content.length >= 5 && content.length <= 10000;
    },

    /**
     * 获取html中的文本内容。实现原理很简单，把标签去掉即可
     * @param html
     * @returns {string}
     */
    getHtmlsInnerTexts: function (html) {
        return html
            .replace(/(<\w+[^>]*?>)|(<\/\w+[^>]*?>)/g, '')
            .replace(/\s+/g, ' '); // 多个空格变成一个空格
    },

    /**
     * 从markdown中提取标题
     * @param html
     * @returns {string}
     */
    getTitleFromMarkdown: function (markdown) {
        return (/^#([^\t\r\n\f]*)/.exec(markdown)[1] || '').trim();
    },

    /**
     * 从纯文本中获取文章简介
     * @param content
     * @returns {string}
     */
    getArticleBrief: function (content) {
        return content.slice(0, 100);
    },

    getElementSize: function(element) {
        var box = element.getBoundingClientRect();
        
        return {
            width: box.width || (box.right - box.left),
            height: box.height || (box.bottom - box.top)
        }
    }
};