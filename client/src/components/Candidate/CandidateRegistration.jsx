import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function CandidateRegistration() {
  const [credential, setCredential] = useState({username:"",email:""});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    insertCandidate();
  };


  const onTextChange =(args)=>{
    var copyOfcredential = {...credential};
    copyOfcredential[args.target.name] = args.target.value;
    setCredential(copyOfcredential);
}
  const insertCandidate = () => {
    console.log(credential.username);
    debugger;
    var helper = new XMLHttpRequest();

    helper.onreadystatechange = ()=>{
        if(helper.readyState == 4 &&
            helper.status == 200)
            {
                navigate('/instructions');
            }
    };
    helper.open("POST","http://127.0.0.1:8082/assessmentCandidate");
    helper.setRequestHeader("Content-Type", "application/json")
    helper.send(JSON.stringify(credential)); 
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Registration Page</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={credential.username}
                onChange={onTextChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={credential.email}
                onChange={onTextChange}
                required
              />
            </label>
          </div>
          <button type="submit">Register</button>
        </form>
      </header>
    </div>
  );
}

export default CandidateRegistration;
