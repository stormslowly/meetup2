

var QuestionRow = React.createClass({
  displayName: 'QuestionRow',
  render: function () {

    var answer = this.props.qa.answer ? (<div><div>Answer</div><p>{this.props.qa.answer}</p></div>):(<div>No answer ye </div>)


    return (
      <div>
      <div>Question</div>
      <p>{this.props.qa.question}</p>
      { answer }
    </div>
    );
  }
});


var QuetsionList = React.createClass({
    displayName: 'QuetsionList',
    render: function () {

        var list = this.props.qas.map(function(qa){
            return (
                <QuestionRow qa={qa} />
            );
        });


        return (
            <div>
                <div>QuetsionList</div>
                <ul>
                    { list }
                </ul>
            </div>
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




React.render(<QuetsionList qas={qas} />,
 document.getElementById('myroom'));
