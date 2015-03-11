var React = require("react");

//TODO: use npm module instead.
var converter = new Showdown.converter();

var Comment = React.createClass({
  render() {
    var raw = converter.makeHtml(this.props.children.toString());
    return <div className="comment">
      <h2 className="commentAuthor">
        {this.props.author}
      </h2>
      <span dangerouslySetInnerHTML={{__html: raw}} />
    </div>;
  }
});

var CommentList = React.createClass({
  render() {
    var comments = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author}>{comment.text}</Comment>
      );
    });
    return <div className="commentList">
      {comments}
    </div>;
  }
});

var CommentForm = React.createClass({
  handleSubmit(e) {
    e.preventDefault();

    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();

    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';

    this.props.onCommentSubmit({ author: author, text: text });
  },

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Your Comment" ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var CommentBox = React.createClass({
    loadCommentsFromServer() {
      $.ajax({
        url: `${this.props.url}?${+(new Date())}`,
        dataType: 'json',
        success: (data) =>
          this.setState({ data: data }),
        error: (xhr, status, err) =>
          console.error(this.props.url, status, err.toString())
      });
    },
    handleCommentSubmit(comment) {
      var comments = this.state.data;
      var newComments = comments.concat([comment]);
      this.setState({ data: newComments });

      $.ajax({
        url: this.props.url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(comment),
        success: function() {
          console.log("YAY");
        },
        error: function() {
          console.log("DERP");
        }
      });

      return false;
    },
    getInitialState() {
      return { data: [] }
    },
    componentDidMount() {
      this.loadCommentsFromServer();
      this.interval = setInterval(this.loadCommentsFromServer,
                                  this.props.pollInterval);
    },
    componentWillUnmount() {
      clearInterval(this.interval);
    },
    render() {
        return <div className="commentBox">
          <h1>Comments</h1>
          <CommentList data={this.state.data} />
          <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        </div>
    }
})

React.render(
  <CommentBox url="http://localhost:8080/comments.json" pollInterval={2000}/>,
  document.getElementById('content')
);
