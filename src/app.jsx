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
  render() {
    return <div className="commentForm">
      I am a comment form!
    </div>;
  }
});

var CommentBox = React.createClass({
    render() {
        return <div className="commentBox">
          <h1>Comments</h1>
          <CommentList data={this.props.data} />
          <CommentForm />
        </div>
    }
})

var data = [
  { author: "Pete Hunt", text: "This is one comment" },
  { author: "Jordan Walke", text: "This is *another* comment" }
]

React.render(<CommentBox data={data}/>, document.getElementById('content'));
