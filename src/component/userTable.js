import React from 'react';
import { Table, Button} from 'react-bootstrap'
import { FaCaretUp } from "react-icons/fa";
import ListUser from './listUsers'


function UserTable({data, handleDeleteuser, handleDob}) {
  console.log(data)
  const allUser = data.map( item => <ListUser 
    image={item.photo}
    username={item.username}
    email={item.email}
    gender={item.gender}
    dob={item.dob}
    news={item.news}
    id={item._id}
    key={item._id.toString()}
    handleDeleteUser={handleDeleteuser}
  /> )



  return (
      <Table  bordered hover size="md">
        <thead>
          <tr style={{textAlign: 'center'}}>
            <th>Username</th>
            <th>Email</th>
            <th><Button variant="light" size="md" block onClick={handleDob} > Birthday <FaCaretUp size="22" style={{marginBottom:8}} /></Button></th>
            <th>Gender</th>
            <th>News</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allUser}
        </tbody>
      </Table>
  );
}
export default UserTable;