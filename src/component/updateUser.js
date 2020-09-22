import React, { Component } from 'react'
import {Form, Col, Button, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {Api, handleChange} from './config/functions';


export default class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.handleChange = handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      id: this.props.location.state.id,
      username: this.props.location.state.username,
      email: this.props.location.state.email,
      gender: this.props.location.state.gender,
      birthday: this.props.location.state.dob,
      news: true,
      photo:null
    }
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
    Api('put', {id: this.state.id, user: user})
      .then(() => console.log('User Updated !!'))
      .catch(err => console.log(err))
      window.location = '/';
  }

  render() {
    // console.log(this.props.location.state);
    return (
      <Container>
        <Row className="justify-content-md-center">
          <form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" value={this.state.email} onChange={(e) => this.handleChange('email', e)} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" value={this.state.username} onChange={(e) => this.handleChange('username', e)} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="text" placeholder="Birthday" value={this.state.birthday} onChange={(e) => this.handleChange('birthday', e)}  disabled />
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
                  Update
                </Button>
              </Col>
            </Row>
          </form>
        </Row>
      </Container>
    );
  }
}