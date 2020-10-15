package com.example.demo.model;

public class Book {

	private String name;
	private String author;
	private String ISBN;
	private String cost;
	
	public Book() {}
	
	

	public Book(String name, String author, String iSBN, String cost) {
		this.name = name;
		this.author = author;
		ISBN = iSBN;
		this.cost = cost;
	}



	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getISBN() {
		return ISBN;
	}

	public void setISBN(String iSBN) {
		ISBN = iSBN;
	}

	public String getCost() {
		return cost;
	}

	public void setCost(String cost) {
		this.cost = cost;
	}
	
	public String toString() {
		return "Name: "+name+"\n"+"Author: "+author+"\n\n";
	}
	
	
}
