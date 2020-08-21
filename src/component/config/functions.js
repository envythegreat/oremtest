import axios from 'axios'

export async function Api (method, {page, size, gender, dob, search, user, id}) {
  if(method === 'delete') {
    return await axios.delete(`http://localhost:5000/api/v1/users/${id}`)

  } else if (method === 'post') {
    return await axios.post('http://localhost:5000/api/v1/users/new', user)

  } else if (method === 'put') {
    return await axios.put(`http://localhost:5000/api/v1/users/${id}`, user)

  } else if (method === 'get') {
    let data = ``;

    if(gender)
      data = `gender=${gender}`
    if(dob)
      if(data){data += `&dob=${dob}`}
      else {data= `dob=${dob}`}
    if(search)
      if(data){data += `&search=${search}`}
      else {data= `search=${search}`}

    return await axios.get(`http://localhost:5000/api/v1/users/${page}/${size}?${data}`);
  }
}

export function appendZero (n) {
  if (n <= 9) {
    return "0" + n;
  }
  return n;
}

export function handleChange(ref,e) {
  if(ref === 'news'){
      if(this.state.news === true) {
        this.setState({
          [ref]:false
        })
      } else {
        this.setState({
          [ref]:true
        })
      }
  } else {
    this.setState({
      [ref]:e.target.value
    })
  }
}