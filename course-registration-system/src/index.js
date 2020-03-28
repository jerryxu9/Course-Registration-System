import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Record(props){
  return <tr>
    <td><button onClick={props.removeRecord}>x</button></td>
    <td>{props.FirstName}</td>
    <td>{props.LastName}</td>
    <td>{props.Activity}</td>
    <td>{props.Restrictions}</td>
  </tr>
}

function SubmissionRecords(props){
  return <table>
    <thead>
      <tr>
        <th>Remove</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Activity</th>
        <th>Restrictions</th>
      </tr>
    </thead>

    <tbody>
      {props.Records.map((record,indx) => 
                         <Record 
                           key={indx}  
                           removeRecord={() => props.removeRecord(indx)}
                           FirstName={record.FirstName} 
                           LastName={record.LastName} 
                           Activity={record.Activity} 
                           Restrictions={record.Restrictions} />)}
    </tbody>
  </table>
}

function SubmissionForm(props){
  return <form>
    <label for="FirstName">Firs tName:</label>
    <input type="text" name="FirstName" value={props.FirstName} onChange={props.handleChange} required />

    <label for="LastName">Last Name:</label>
    <input type="text" name="LastName" value={props.LastName} onChange={props.handleChange} required />

    <label for="Activity">Activity:</label>
    <select name="Activity" value={props.Activity} onChange={props.handleChange}>
      <option value="" disabled required>Select...</option>
      {props.activities.map(activity => <option value={activity}>{activity}</option>)}
    </select>

    <label for="Restrictions">Check all that apply:</label>
    <ol>
      {props.restrictions.map((restriction,indx) => <li>
                                <input 
                                  type="checkbox" 
                                  name="Restrictions[]" 
                                  value={restriction.val} 
                                  onChange={props.handleChange} 
                                  data-indx={indx} 
                                  checked={(props.Restrictions[indx])? true:false} />
                                
                                {restriction.val + ") " + restriction.txt}
                              </li>)}
    </ol>
  </form>
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.activities = [
      "Science Lab",
      "Swimming",
      "Cooking",
      "Painting"
    ]
    this.restrictions = [
      {val:"a" ,txt:"Dietary Restrictions"},
      {val:"b" ,txt:"Physical Disabilities"},
      {val:"c" ,txt:"Medical Needs"}
    ]
    let restrictionsInit = new Array(this.restrictions.length)
    restrictionsInit.fill("")
    this.state = {
      FirstName: "",
      LastName: "",
      Activity: "",
      Restrictions: restrictionsInit,
      Records: [
        {FirstName:"Michal",  LastName:"Amichai",   Activity:"Science Lab", Restrictions:"c"},
      ],
    }
  } 
  
  handleChange(event){
    if(event.target.name == "Restrictions[]"){
      let Restrictions = this.state.Restrictions.slice()
      Restrictions[event.target.dataset.indx] = (event.target.checked)? event.target.value:"";
      this.setState({Restrictions:Restrictions})
    }
    else{
      let newState = {}
      newState[event.target.name] = event.target.value
      this.setState(newState)
    }
  }
  
  addRecord(){
    let RecordsCopy = this.state.Records.slice()
    RecordsCopy.push({
      FirstName:this.state.FirstName,
      LastName:this.state.LastName,
      Activity:this.state.Activity,
      Restrictions:this.state.Restrictions.join("")
    })
    let restrictionsInit = this.state.Restrictions.slice().fill("")
    this.setState({
      FirstName: "",
      LastName: "",
      Activity: "",
      Restrictions: restrictionsInit,
      Records:RecordsCopy
    })
  }
  
  removeRecord(index){
    let RecordsCopy = this.state.Records.slice()
    RecordsCopy.splice(index,1)
    this.setState({Records:RecordsCopy})
  }
  
  render(){
    return (
      <div>
        <SubmissionForm 
          handleChange={this.handleChange.bind(this)}
          FirstName={this.state.FirstName}
          LastName={this.state.LastName}
          Activity={this.state.Activity}
          activities={this.activities}
          Restrictions={this.state.Restrictions}
          restrictions={this.restrictions} />
        
        <button className="Submit" name="Submit" onClick={() => this.addRecord()}>Submit</button>
        
        <hr />
        
        <h2>Submission Records</h2>
        <SubmissionRecords Records={this.state.Records} removeRecord={this.removeRecord.bind(this)} />
        
      </div>
    )
  }
}

ReactDOM.render(<App />,document.getElementById("root"))