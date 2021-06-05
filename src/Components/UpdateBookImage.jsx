import React from "react";

import image from "../images/bgimage.svg"
import NavBar from "./NavBar";
import Form from "./common/Form";
import { updateBookImage } from "../services/bookService"


class UpdateBookImage extends Form {
    state = {
        errors: {},
        selectedFile:null,
    };
    
    doSubmit = async () => {
        const id = this.props.match.params.id;
        let data = new FormData()
        data.append("image",this.state.selectedFile)
        
        try{
            await updateBookImage(data, id )
            window.location="/history"
            
      
          }
          catch(e)
          {
              console.log(e)
              const {error} = e.response.data;
              console.log(error)
              const errors = {}
              if (error) {
                for (let item in error)
                    errors[item] = error[item][0]
                this.setState({
                    errors
                })
            }
      
          }
    }
    onChangeFileHandler=event=>{
        let errors = {...this.state.errors}
        if (errors.image)
        {
            delete errors["image"]
        }
        let data = {...this.state.data}
        this.setState({
            selectedFile: event.target.files[0],
            errors
          })
        
       
    
    }

    
    render() {
        return (
            <React.Fragment>
                <NavBar />
                 
                    <div className="row">
                        <div className="col-lg-4  d-lg-inline d-none">
                            <img src={image} alt="img" width=
                                "500px" height="600px" />
                        </div>
                        <form
                            className="col-sm-12 col-lg-4 mt-3 mx-auto addbookBody"
                            onSubmit={this.handleOnSubmit}
                            id="update-book-image"
                        >
                            <h2 className="text-center col-lg-8  col-sm-12 py-3">
                                <strong className="themefont">Update Image of Book</strong>
                            </h2>

                            <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="File01">Image of Book</label>
                            <input type="file" accept="image/*" className="form-control" id="File01" name="file" onChange={this.onChangeFileHandler}/>
                             </div>
                             {this.state.errors.image && <div className="text-danger mt-2 mx-3">{this.state.errors.image}</div>}
                       


                            <button
                                type="submit"
                                className="btn btn-primary mt-3 col-12"
                            >
                                <strong>Update Image</strong>
                            </button>

                        </form>
                    </div>
                
            </React.Fragment>
        );
    }
}

export default UpdateBookImage;