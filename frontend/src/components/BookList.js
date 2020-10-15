import React, { Component } from 'react';
import {Card,Table,ButtonGroup,Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList,faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {Link} from 'react-router-dom';

class BookList extends Component {

  constructor(props){
    super(props);
    this.state={
      books:[]
    };
  }

  componentDidMount(){
    axios.get('http://localhost:8080/api/books')
    .then((res)=>{
      this.setState({
        books: res.data
      })
    });
  }

  deleteItem=(index)=>{
    axios.delete("http://localhost:8080/api/books/"+index)
    .then(res=>{
      if(res.data!=null){
        alert('Book Deleted Successfully');
        window.location.reload();
      }
    });
  }

  updateItem=(event)=>{
    event.preventDefault();
    alert('Updated');
  }

  render() {
    return (
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header><FontAwesomeIcon icon={faList}/> Book List</Card.Header>
        <Card.Body>
          <Table bordered hover striped variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN Number</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {

                this.state.books.map((book,index)=>
                  <tr>
                    <td key={index}>{index+1}</td>
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>{book.isbn}</td>
                    <td>{book.cost}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={"/edit/"+index} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit}/></Link>{' '}
                        <Button size="sm" onClick={this.deleteItem.bind(this,index)} variant="outline-danger"><FontAwesomeIcon icon={faTrash}/></Button>
                      </ButtonGroup>

                    </td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }

}

export default BookList;
