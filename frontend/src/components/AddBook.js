import React, { Component } from 'react';
import {Form,Card,Button,Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave,faPlusSquare,faUndo,faList} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

class AddBook extends Component {

  constructor(props){
    super(props);
    this.state=this.initialState;
  }

  initialState={
    id:'',title:'',author:'',isbn:'',cost:''
  }

  componentDidMount(){
    const bookId = +this.props.match.params.id;
    if(bookId){
      this.findBookById(bookId);
    }
  }

  findBookById = (id) =>{
    axios.get("http://localhost:8080/api/books/"+id)
    .then(res=>{
      if(res.data != null){
        this.setState({
          id: id,
          title: res.data.name,
          author: res.data.author,
          isbn: res.data.isbn,
          cost: res.data.cost
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  bookList=()=>{
    return this.props.history.push("/list");
  }

  resetBook=()=>{
    this.setState(()=>this.initialState);
  }

  submitBook=(event)=>{
    event.preventDefault();
    if(this.state.id===''){
      var book = {name: this.state.title, author: this.state.author, isbn: this.state.isbn, cost:this.state.cost};
      axios({
        method: 'post',
        url: 'http://localhost:8080/api/books',
        data: book
      })
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      });
      alert('Book Submitted');
    }
    else{
      var book = {name: this.state.title, author: this.state.author, isbn: this.state.isbn, cost: this.state.cost};
      axios({
        method: 'put',
        url: 'http://localhost:8080/api/books/'+this.state.id,
        data: book
      })
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      });
      alert('Book Edited');
    }
    this.setState(()=>this.initialState);

  }

  bookChange=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    });
  }

  render() {
    return (
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header><FontAwesomeIcon icon={faPlusSquare}/> Add New Book</Card.Header>
        <Form onReset={this.resetBook} onSubmit={this.submitBook} id="bookFormId">
          <Card.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control required name="title" value={this.state.title} onChange={this.bookChange} type="text" placeholder="Enter Title" className={"bg-dark text-white"} autocomplete="off"/>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control required name="author" value={this.state.author} onChange={this.bookChange} name="author" type="text" placeholder="Enter Author" className={"bg-dark text-white"} autocomplete="off"/>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridISBN">
                <Form.Label>ISBN</Form.Label>
                <Form.Control required name="isbn" value={this.state.isbn} onChange={this.bookChange} name="isbn" type="text" placeholder="Enter ISBN" className={"bg-dark text-white"} autocomplete="off"/>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCost">
                <Form.Label>Cost</Form.Label>
                <Form.Control required name="cost" value={this.state.cost} onChange={this.bookChange} name="cost" type="text" placeholder="Enter Cost" className={"bg-dark text-white"} autocomplete="off"/>
              </Form.Group>
            </Form.Row>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" type="submit">
                <FontAwesomeIcon icon={faSave}/> Submit
              </Button>{' '}
              <Button variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo}/> Reset
              </Button>{' '}
              <Button variant="info" type="button" onClick={this.bookList}>
                <FontAwesomeIcon icon={faList}/> Book List
              </Button>
          </Card.Footer>
        </Form>
      </Card>
    );
  }

}

export default AddBook;
