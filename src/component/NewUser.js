import React, { Component } from 'react'
import {Form, Col, Button, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import DatePicker from 'react-datepicker';
import {Api, handleChange} from './config/functions';


export default class NewUser extends Component {
  constructor(props) {
    super(props);
    

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.handleChange = handleChange.bind(this)
    this.state = {
      username: '',
      email: '',
      gender: '',
      birthday: new Date(),
      news: true,
      photo:null
    }
  }
  // this function to handle changes for inputs

  onChangeDate(date) {
    this.setState({
      birthday: date
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      email: this.state.email,
      dob: this.state.birthday,
      news: this.state.news,
      gender: this.state.gender,
      photo: this.state.photo
    }
    // console.log(user);
    Api('post', {user: user})
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
      window.location = '/';
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={(e) => this.handleChange('email', e)} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" value={this.state.username} onChange={(e) => this.handleChange('username', e)} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Birthday</Form.Label>
                {/* <Form.Control type="text" placeholder="DD/MM/YYYY" value={this.state.birthday} onChange={(e) => this.handleChange('birthday', e)} /> */}
                <DatePicker
                  selected={this.state.birthday}
                  onChange={this.onChangeDate}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Gender</Form.Label>
                <Form.Control as="select"  value={this.state.gender} onChange={(e) => this.handleChange('gender', e)}>
                  <option>Choose..</option>
                  <option>Male</option>
                  <option>Female</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group id="formGridCheckbox">
              <Form.Check type="checkbox" label="Join our news (Optional)" checked={this.state.news} onChange={(e) => this.handleChange('news', e)} />
            </Form.Group>

            <Row>
              <Col>
                <Link to="/" >
                  <Button variant="primary">
                    Back 
                  </Button>
                </Link>
              </Col>
              <Col>
                <Button variant="primary" type="submit" style={{float: 'right'}}>
                  Submit
                </Button>
              </Col>
            </Row>
          </form>
        </Row>
      </Container>
    );
  }
}