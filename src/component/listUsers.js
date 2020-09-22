import React, {Component} from 'react';
import {Image, Button} from 'react-bootstrap'
import { FaRegTrashAlt, FaUserEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import {appendZero} from './config/functions';

class ListUser extends Component{
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
    }
    this.handleRemoveUser = () => this.props.handleDeleteUser(this.state.id);
  }

  render() {
    const {username, email, dob, gender, news, image, id} = this.props;
    const data = {username, email, dob, gender, news, image, id};
    const profileImage =  image === null ? require('../assest/img/avatardefault.png') :require('../assest/img/avataaars.png');
    let mydate = new Date(dob);
    mydate = mydate.getFullYear() + '/' + appendZero(mydate.getMonth()) + '/' + appendZero(mydate.getDay());
    return (
      <tr style={{textAlign: 'center'}}>
        <td >
          <Image src={profileImage} roundedCircle width='30' style={{float: 'left'}} /> {username}
        </td>
        <td>{email}</td>
        <td>{mydate}</td>
        <td>{gender}</td>
        <td>{news ? 'Subbed' : 'not Subbed'}</td>
        <td style={{textAlign: 'center'}}><Button variant="danger" onClick={this.handleRemoveUser} ><FaRegTrashAlt size="22" /></Button></td>
        <td style={{textAlign: 'center'}}>
          <Link to={{
                  pathname : '/update',
                  state: data
                }}>
              <Button variant="warning"><FaUserEdit size="22" /></Button>
          </Link>
        </td>
      </tr>
    )
  }
}

export default ListUser;