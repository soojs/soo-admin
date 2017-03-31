var time = require('util/Time'),
    articleType = require('util/articleType'),
    articleStatus = require('util/articleStatus');

var ArticleList = React.createClass({
    render: function() {
        var that = this;

        return (
            <div className="list">
                <table>
                    <thead>
                    <tr>
                        <th>标题</th>
                        <th>内容</th>
                        <th>类型</th>
                        <th>创建日期</th>
                        <th>修改日期</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.list.map(function (item) {
                            return (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{item.brief}</td>
                                    <td>{articleType(item.type)}</td>
                                    <td>{time(item.createdAt, 'yyyy-MM-dd')}</td>
                                    <td>{time(item.updatedAt, 'yyyy-MM-dd')}</td>
                                    <td>{articleStatus(item.status)}</td>
                                    <td>
                                        <div className="trigger">
                                            <span onClick={that.props.modifyArticle.bind(null, item)}>修改</span>
                                            <span onClick={that.props.deleteArticle.bind(null, item)}><span>删除</span></span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = ArticleList;