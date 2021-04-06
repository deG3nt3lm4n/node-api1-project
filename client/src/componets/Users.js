import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { map } from '../../../api/server';

function Users() {

  const [initialState,setInitialState] = useState([])

  useEffect(() => {

    axios({
      method: "GET",
      url: "http://localhost:5000/api/users",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res.data)
      setInitialState(res.data)
    });

  },[])




  return (
    <div>
      <h2>There are {initialState.length} users</h2>
      {/* {
        initialState.map(user => {
          return <p>{user.bio}</p>
        })
      } */}
    </div>
  )
}

export default Users
