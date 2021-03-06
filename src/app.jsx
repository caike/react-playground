var React = require("react");
var cx = require('classnames');

var allItems = [];
allItems.push("Buy ingredients for Crock Pot");
allItems.push("Pick up chair at IKEA");
allItems.push("Go see mom");

class TodoList extends React.Component {
  constructor(props){
    super(props);
    this.addEvent = this.addEvent.bind(this);
    this.toggleItem = this.toggleItem.bind(this);

    this.state = { allItems };
  }
  render() {
    var items = this.state.allItems.map((item) => {
      return <li key={item}><TodoItem item={item} toggle={this.toggleItem} /></li>;
    });
    return(
      <div>
        <ul>{items}</ul>
        <p><NewTodoItem addEvent={this.addEvent} /></p>
      </div>
    );
  }
  toggleItem(todo){
    todo.setState({ isDone: !todo.state.isDone });
  }
  addEvent(todoItem){
    allItems.push(todoItem.newItem);
    this.setState({ allItems });
  }
}

class TodoItem extends React.Component {
  constructor(props){
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);

    this.state = {
      isDone: false
    };
  }
  render(){
    var classes = cx({
      'item-done': this.state.isDone
    });
    return <div className={classes}>{this.props.item}
      <input type="checkbox" onChange={this.onChangeHandler} />
    </div>;
  }
  onChangeHandler(){
    this.props.toggle(this);
  }
}

class NewTodoItem extends React.Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount(){
    React.findDOMNode(this.refs.itemName).focus();
  }
  render(){
    return (<form onSubmit={this.onSubmit}>
      <input ref="itemName" type="text" />
    </form>);
  }
  onSubmit(event){
    event.preventDefault();
    var input = React.findDOMNode(this.refs.itemName);
    var newItem = input.value;
    this.props.addEvent({ newItem });
    input.value = '';
  }
}

React.render(<TodoList />, document.getElementById('example'));
