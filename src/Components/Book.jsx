import React, { Component } from "react";
import NavBar from "./NavBar";
import { Modal, Button } from "react-bootstrap";
import  {placeOrder} from "../services/orderService"
import  {getBook} from "../services/bookService"
class Book extends Component {
    state = {
        book: [],
        message: null,
        isOpen: false,
        quantity: 0,
        error: null,
    };

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    async componentDidMount() {
        const id = parseInt(this.props.match.params.id);
        try {
            const { data } = await getBook(id);
            this.setState({ book: data });
        } 
        catch (e) {
           this.setState({ message: true });
        }
    }

    handleOnChange = ({ currentTarget: input }) => {
        this.setState({ quantity: parseInt(input.value) });
    };

    doSubmit = async () => {
        if (this.state.quantity <= this.state.book[0].stock && this.state.quantity > 0 )
        {   
            this.closeModal()
            const {quantity, book} = this.state
            
            await placeOrder({quantity, seller_id:book[0].seller_id, book_id:book[0].id})
            this.setState({ quantity: 0 });
            

        }
        else{
            this.setState({ error: "The quantity should be between 1 and " + this.state.book[0].stock })
        }
    }

    renderModal = () => {
        return (
            <Modal size="sm" show={this.state.isOpen} onHide={this.closeModal} dialogClassName='custom-dialog'>
                <Modal.Header>
                    <Modal.Title>Order Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor="quantity" class="sr-only">
                                Quantity of Book
              </label>
                            <input
                                type="number"
                                class="form-control mt-2"
                                value={this.state.quantity}
                                id="quantity"
                                placeholder="No of books"
                                min={1}
                                max={this.props.max}
                                onChange={this.handleOnChange}
                            />
                            {this.state.error && (
                                <div className="text-danger mt-2 mx-3">{this.state.error}</div>
                            )}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>
                        Close
          </Button>
                    <Button variant="primary" onClick={this.doSubmit}>
                        Order
          </Button>
                </Modal.Footer>
            </Modal>
        );
    };
    renderBook = () => {
        const book = this.state.book[0];
        
        return (
            <React.Fragment>
                <div className="col-sm-12 col-lg-3 offset-lg-1">
                    <img
                        src={"http://localhost:8000/storage/" + book.image}
                        style={{ objectFit: "cover", height: "300px" }}
                        className="card-img-top"
                        alt="..."
                    />
                </div>
                {this.renderModal()}

                <div className="col-sm-12 col-lg-4 offset-lg-1">
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-light">
                            <strong className="mr-2 h1">{book.bookName}</strong>
                        </li>

                        <li className="list-group-item list-group-item-light">
                            <strong className="mr-2">Author:&nbsp;</strong> {book.author}
                        </li>
                        <li className="list-group-item list-group-item-light">
                            <strong className="mr-2">Publication:&nbsp;</strong>{" "}
                            {book.publication}
                            <br />
                            <strong className="mr-2">Edition:&nbsp;</strong> {book.edition}{" "}
                            <br /> <strong className="mr-2">Year:&nbsp;</strong> {book.year}{" "}
                            <br />
                            <strong className="mr-2">ISBN:&nbsp;</strong> {book.isbn}
                        </li>

                        <li className="list-group-item list-group-item-light">
                            <strong className="mr-2">Price:&nbsp;</strong>
                                  Rs {book.price}
                            <br />
                            <strong className="mr-2">Negotiable:&nbsp;</strong>
                            {book.negotiable === 1 ? "Yes" : "No"}
                        </li>
                        <li className="list-group-item list-group-item-light">
                            <strong className="mr-2">Stock:&nbsp;</strong>
                            {book.stock}
                        </li>

                        <li className="list-group-item list-group-item-light">
                            <strong className="mr-2">Seller:&nbsp; </strong>{" "}
                            {book.firstname + " " + book.lastname} <br />{" "}
                            <strong className="mr-2">Contact:&nbsp; </strong> {book.contact}
                        </li>

                        <li className="list-group-item list-group-item-light">
                            <button className="btn btn-danger" onClick={this.openModal}>
                                <i className="bi bi-cart4"></i> Buy Now
              </button>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        );
    };

    renderMessage = () => {
        return (
            <div className="col-sm-12 col-md-6 col-lg-3 offset-md-3 offset-lg-4 mt-5 pt-5">
                <div className="alert alert-danger" role="alert">
                    <h4>Sorry Book Not found</h4>
                </div>
            </div>
        );
    };

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="row pt-5">
                    {this.state.book.length === 0 && !this.state.message && (
                        <div
                            className="text-center"
                            style={{ marginTop: "150px", height: "90vh" }}
                        >
                            <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                    )}
                    {this.state.book.length === 0 &&
                        this.state.message &&
                        this.renderMessage()}
                    {this.state.book.length > 0 && this.renderBook()}
                </div>
            </React.Fragment>
        );
    }
}

export default Book;
