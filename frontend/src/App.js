import React from 'react';
import NavigationBar from './components/NavigationBar';
import './App.css';
import {Container,Row,Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import AddBook from './components/AddBook';
import BookList from './components/BookList';

function App() {

  const marginTop = {
    marginTop:"20px"
  };


  return (
    <Router>
      <NavigationBar/>
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <Switch>
              <Route path="/" exact component={Welcome}/>
              <Route path="/list" exact component={BookList}/>
              <Route path="/add" exact component={AddBook}/>
              <Route path="/edit/:id" exact component={AddBook}/>
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
