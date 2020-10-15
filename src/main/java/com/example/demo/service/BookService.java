package com.example.demo.service;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import com.example.demo.model.Book;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class BookService {
	private JSONArray array;
	private JSONParser parser = new JSONParser();
	private final String path = "src/main/resources/Json/bookdata.json";
	
	public List<Book> getAllBooks() {
		try {
			array = (JSONArray)parser.parse(new FileReader(path));
		}catch(Exception e) {
			e.printStackTrace();
		}
		List<Book> books = new ArrayList<>();
		for(Object o:array) {
			JSONObject book = (JSONObject) o;
			String name = (String) book.get("name");
			String author = (String)book.get("author");
			String ISBN = (String)book.get("ISBN");
			String cost = (String)book.get("cost");
			books.add(new Book(name,author,ISBN,cost));
		}
		return books;
	}
	
	public void addBook(Book book) {
		JSONObject obj = new JSONObject();
		obj.put("name", book.getName());
		obj.put("author", book.getAuthor());
		obj.put("ISBN",book.getISBN());
		obj.put("cost",book.getCost());
		try {
			array = (JSONArray)parser.parse(new FileReader(path));
			array.add(obj);
			FileWriter file = new FileWriter(path);
			file.write(array.toJSONString());
			file.flush();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public void deleteBook(String id) {
		try {
			array = (JSONArray)parser.parse(new FileReader(path));
			array.remove(Integer.parseInt(id));
			FileWriter file = new FileWriter(path);
			file.write(array.toJSONString());
			file.flush();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public void updateBook(String id,Book book) {
		JSONArray array2 = new JSONArray();
		try {
			array = (JSONArray)parser.parse(new FileReader(path));
			Iterator<JSONObject> books = array.iterator();
			int num = 0, req = Integer.parseInt(id);
			while(books.hasNext()) {
				if(num == req) {
					JSONObject obj = new JSONObject();
					obj.put("name", book.getName());
					obj.put("author", book.getAuthor());
					obj.put("ISBN",book.getISBN());
					obj.put("cost",book.getCost());
					array2.add(obj);
					books.next();
					num++;
				}
				else {
					JSONObject obj = (JSONObject) books.next();
					array2.add(obj);
					num++;
				}
			}
			FileWriter file = new FileWriter(path);
			file.write(array2.toJSONString());
			file.flush();	
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public Book getBook(String id) {
		Book ans = new Book();
		try {
			array = (JSONArray) parser.parse(new FileReader(path));
			Iterator<JSONObject> books = array.iterator();
			int num = 0,req = Integer.parseInt(id);
			while(books.hasNext()) {
				if(num==req) {
					JSONObject obj = (JSONObject) books.next();
					ans.setName((String)obj.get("name"));
					ans.setAuthor((String)obj.get("author"));
					ans.setCost((String)obj.get("cost"));
					ans.setISBN((String)obj.get("ISBN"));
					break;
				}
				else {
					books.next();
					num++;
					continue;
				}
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return ans;
	}
}
