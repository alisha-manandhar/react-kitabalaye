import React, { Component } from 'react'
import { getOrdersToBeResponded,updateSeller} from "../services/orderService"
import ModalCustom from "./common/ModalCustom"
import {NavLink} from "react-router-dom"

class RespondedOrders extends Component{
    state = {
        books: [],
        message: null,
        isOpen: false,
        id: null,
        bookname:null,
        status: null
    }
    openModal = (id,bookname) => this.setState({ isOpen: true,id,bookname});
    closeModal = () => this.setState({ isOpen: false });
    
    onClickReject = async() => {
        this.closeModal()
        await updateSeller({"status": 'rejected'},this.state.id)
        this.setState({
            message:null,
            id:null,
            books:[],
            bookname:null
        })
    }
    onClickAccepted = async() => {
        this.closeModal()
        await updateSeller({"status": 'accepted'},this.state.id)
        this.setState({
            message:null,
            id:null,
            books:[],
            bookname:null
        })
    }
    async componentDidMount(){
        const {data} = await getOrdersToBeResponded()
        let message = null
        if (data.length === 0)
        {
            message = true
        }
        this.setState({books:data, message})
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.books.length !== this.state.books.length) {
            const {data} = await getOrdersToBeResponded()
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
                    <h4>Sorry, you dont have any requests for ordering</h4>
                </div>
            </div>
        )
    }
    
    renderTable= () => {
        const columns = ["bookname", "author", "quantity", "price",  "negotiable", "image", "Buyer","Contact","Actions"]
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
                            <td>{book.quantity}</td>
                            <td>{book.price}</td>
                            <td>{book.negotiable === 1 ? "yes" : "no"}</td>
                            <td><img src={"http://localhost:8000/storage/" + book.image} width="200px" height="200px"  style={{objectFit:"cover"}}/></td>
                            <td>{book.buyerFirstname + " " + book.buyerLastname}</td>
                            <td>{book.contact}</td>
            
                            <td> 
                            
                                <button className="btn btn-success" key={book.id + "cancel"} onClick={()=>this.openModal(book.id,book.bookName)}> Respond </button> </td>

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
               <h4>Orders to be responded</h4> 
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
                        <ModalCustom yes={this.onClickAccepted}
                            title="Cancel Order"
                            body={"Do you want to accept this order " + this.state.bookname + "?"}
                            show={this.state.isOpen} 
                           no={this.onClickReject}
                           close={this.closeModal}
    
                           />
                            

                   
               
               
        </React.Fragment>
        )
                    }


}

export default RespondedOrders

