

var QuestionRow = React.createClass({
  displayName: 'QuestionRow',
  render: function () {

    var answer = this.props.qa.answer ? (React.createElement("div", null, React.createElement("div", null, "Answer"), React.createElement("p", null, this.props.qa.answer))):(React.createElement("div", null, "No answer ye "))


    return (
      React.createElement("div", null, 
      React.createElement("div", null, "Question"), 
      React.createElement("p", null, this.props.qa.question), 
       answer 
    )
    );
  }
});


var QuetsionList = React.createClass({
    displayName: 'QuetsionList',
    render: function () {

        var list = this.props.qas.map(function(qa){
            return (
                React.createElement(QuestionRow, {qa: qa})
            );
        });


        return (
            React.createElement("div", null, 
                React.createElement("div", null, "QuetsionList"), 
                React.createElement("ul", null, 
                     list 
                )
            )
        );
    }
});

var qas = [
{
    question:'why your are so cool',
    answer:'thanks my parent',
    id:1
},{
    question:'this is a hard question so no answer!',
    id:2
},{
    question:'where are you comes from ?',
    answer:'quzhou',
    id:3
}]




React.render(React.createElement(QuetsionList, {qas: qas}),
 document.getElementById('myroom'));
