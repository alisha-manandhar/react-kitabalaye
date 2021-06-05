import React, { Component } from "react";
import { Link } from "react-router-dom";

import NavBar from "./NavBar"
import {getBooks} from "../services/bookService"
class Books extends Component {
    state = {
        books: [],
        message: null
    };

    async componentDidMount() {
        try{
            const {data} = await getBooks()
            this.setState({ books:data })

            if (data.length === 0)
                this.setState({message:true})
        }
        catch(e)
        {
            console.log(e)
        }
        
    }

    renderMessage = () => {
        return (
            <div className="col-sm-12 col-md-6 col-lg-4 offset-md-3 offset-lg-4 mt-5 pt-5">
                <div className="alert alert-danger text-center" role="alert" >
                    <h4>Sorry, No books are available right now</h4>
                </div>
            </div>
        );
    };

    renderBooks = () => {
        
        const { books } = this.state;
        return books.map((book, count) => (
            <div className="col-sm-6 col-lg-3 col-md-4 mb-4 mb-md-3" key={count}>
                <div className="card">
                    <img src={"http://localhost:8000/storage/" +book.image} height="200px" style={{objectFit: 'cover'}} className="card-img-top" alt="..." />
                    <div className="card-body" style={{backgroundColor:"rgb(238 241 243)"}} >
                        <h3 className="card-title" style={{height:"60px"}}><strong> {book.bookName}</strong></h3>
                        <p className="card-text">
                            
                            Price: <strong>Rs. {book.price}</strong> &nbsp; &nbsp;&nbsp;&nbsp;
                            
                            Stock: <strong>{book.stock}</strong><br/>
                            
                        
                             Negotiable: <strong className="text-danger"> {book.negotiable=== 1 ? "Yes":"No"}</strong>
                        </p>
                        <Link to={"/books/" + book.id}>
                            <button
                                className="btn btn-primary"
                                type="button"
                            >
                                <strong> Details</strong>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        ));
    };

    render() {
        return (
            <React.Fragment>    
            <NavBar />
            <div className="container">
            {this.state.books.length === 0 && !this.state.message && (
                        <div
                            className="text-center"
                            style={{ marginTop: "150px", height: "90vh" }}
                        >
                            <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                    )}
                    {this.state.books.length === 0 &&
                        this.state.message &&
                        this.renderMessage()}
                    
                    <div className="row mt-5">
                        {this.state.books.length > 0 && this.renderBooks()}
                    </div>
                    
               
               </div>
        </React.Fragment>
                
           
        );
    }
}

export default Books;