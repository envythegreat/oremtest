import UserTable from './userTable'
import React, {Component} from 'react';
import {Container, Row, Col, Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Api, handleChange} from './config/functions';
// import { FaThinkPeaks } from 'react-icons/fa';

class Home extends Component{

  constructor(props) {
    super(props)
    
    this.state = {
      listUsers: {},
      isLoading: true,
      likeUser: '',
      message: 'Data is Loading Please wait ...',
      gender: '',
      dob:'',
      page: 1
    }

    this.handlePage = this.handlePage.bind(this)
    this.handleChange = handleChange.bind(this)
  }

  // function that handle all the change on the page / filter data / .....
  handlePage = () => {
    Api('get', {page: this.state.page, size: 10, gender: this.state.gender, dob: this.state.dob, search: this.state.likeUser})
      .then(data => {
        console.log(data)
        this.setState({
          listUsers: data.data.events,
          isLoading: false
        })
      }).catch(error => {console.log('Something Went Wrong : ', error)});
  }

  // init data on the page
  componentDidMount() {
    this.handlePage()
  }


  //Delete a user based on his ID
  handleDelete = (id) => {
    Api('delete', {id:id})
      .catch(err => console.log(`Error : ${err}`));
    this.setState( prevState => {
      return {listUsers: prevState.listUsers.filter(user => user._id !== id)}
    })
  }

  handleDob = () => {
    if(this.state.dob === -1 || !this.state.dob) {
      this.setState({
        dob: 1
      })
    }else {
      this.setState({
        dob: -1
      })
    }
    this.handlePage()
  }

  render() {
    let Mydata ;
    if (!this.state.isLoading) {
      Mydata =  <UserTable data={this.state.listUsers} handleDeleteuser={this.handleDelete} handleDob={this.handleDob} />;
    } else {
      Mydata =  <h1>{this.state.message}</h1>;
    }
    return (
      <Container style={{marginTop:50}}>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Find a user"
                value={this.state.likeUser}
                onChange={(e) => {this.handleChange('likeUser', e)}}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.handlePage} >Goo!</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col>
            <Row>
              <Col>
                <Form.Control as="select" style={{marginLeft: 80}} value={this.state.gender} onChange={(e) => this.handleChange('gender', e)} onClick={this.handlePage}>
                  <option value="0">Filter By Gender</option>
                  <option value="-1">Male</option>
                  <option value="1">Female</option>
                </Form.Control>
              </Col>
              <Col >
                <Link to='/new'>
                  <Button varians="primary" size="md" active style={{float: 'right'}}>
                    New User
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          {Mydata}
        </Row>
      </Container>
      // 
    );
  }
}

export default Home;
