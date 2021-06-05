import React, { Component } from 'react'
import { getAddedBooks,deleteBook} from "../services/bookService"
import ModalCustom from "./common/ModalCustom"
import {NavLink} from "react-router-dom"

class AddedBookTable extends Component{
    state = {
        books: [],
        message: null,
        isOpen: false,
        id: null,
        bookname: null
    }
    openModal = (id,bookname) => this.setState({ isOpen: true,id,bookname });
    closeModal = () => this.setState({ isOpen: false });
    
    onClickYes = async() => {
        console.log("submitted")
        this.closeModal()
        await deleteBook(this.state.id)
        this.setState({
            message:null,
            id:null,
            bookname:null,
            books:[]
        })
    }
    async componentDidMount(){
        const {data} = await getAddedBooks()
        let message = null
        if (data.length === 0)
        {
            message = true
        }
        this.setState({books:data, message})
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.books.length !== this.state.books.length) {
            const {data} = await getAddedBooks()
            let message = null
            if (data.length === 0)
            {
                message = true
            }
            this.setState({books:data, message})
        }
      }
    
      
      

    renderMessage = () => {
        return (
            <div className="col-sm-12 col-md-6 col-lg-4 offset-md-3 offset-lg-4 mt-5 pt-5">
                <div className="alert alert-danger text-center" role="alert" >
                    <h4>Sorry, No books are added by you</h4>
                </div>
            </div>
        )
    }
    
    renderTable= () => {
        const columns = ["bookname", "author", "quantity", "price", "isbn", "negotiable", "image", "Actions"]
        return (
            <table className="table  table-striped table-responsive">
                <thead>
                    <tr key="columns">
                        {columns.map(col => <th scope="col" key={col}>{col}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.state.books.map(book=>{
                        return(<tr key={book.id}>
                            <td>{book.bookName}</td>
                            <td>{book.author}</td>
                            <td>{book.stock}</td>
                            <td>{book.price}</td>
                            <td>{book.isbn}</td>
                            <td>{book.negotiable === 1 ? "yes" : "no"}</td>
                            <td><img src={"http://localhost:8000/storage/" + book.image} width="200px" height="200px"  style={{objectFit:"cover"}}/></td>
                            <td> 
                                <NavLink to={"/updatebook/" + book.id}>
                                <button className="btn btn-primary" key={book.id + "edit"}><i className="bi bi-pencil-square"></i></button>&nbsp;
                                </NavLink>
                                <NavLink to={"/updatebook-image/" + book.id}>
                                <button className="btn btn-secondary" key={book.id + "editImage"}> <i className="bi bi-card-image"></i></button>&nbsp;
                                </NavLink>
                                <button className="btn btn-danger" key={book.id + "delete"} onClick= {() => this.openModal(book.id,book.bookName)}>&nbsp;<i className="bi bi-archive-fill"></i></button>
                            </td>

                        </tr>
                        )
                    })}
                </tbody>
            </table>
        )


    }
    
    render() {
        return (
            <React.Fragment>    
            <div className="alert alert-success text-center">
               <h4>Books added by me</h4> 
            </div>
             
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
                    
                    
                        {this.state.books.length > 0 && this.renderTable()}
                        <ModalCustom yes={this.onClickYes}
                            title="Delete Book"
                            body={"Do you want to delete book named " + this.state.bookname + "?"}
                            show={this.state.isOpen} 
                            no={this.closeModal}
                           closeModal={this.closeModal}
                           />
                            

                   
               
               
        </React.Fragment>
        )
                    }


}

export default AddedBookTable

