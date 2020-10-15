package com.example.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.model.Book;
import com.example.demo.service.BookService;
import java.util.List;

//@CrossOrigin(origins= "http://localhost:3000")
@RestController
public class PathController {
	
	private BookService bookService = new BookService();
	
	@RequestMapping("/api")
	public String home() {
		return "Welcome To Home!";
	}
	

	@RequestMapping("/api/books")
	public List<Book> getBooks() {
		return bookService.getAllBooks();
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/api/books")
	public void addBook(@RequestBody Book book) {
		bookService.addBook(book);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/api/books/{id}")
	public void deleteBook(@PathVariable String id) {
		bookService.deleteBook(id);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/api/books/{id}")
	public void updateBook(@PathVariable String id,@RequestBody Book book) {
		bookService.updateBook(id,book);
	}
	
	@RequestMapping("/api/books/{id}")
	public Book getBook(@PathVariable String id) {
		return bookService.getBook(id);
	}

}
