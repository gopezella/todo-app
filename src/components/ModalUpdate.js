import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class ModalComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            description: ''
        }
    }

    updateTodo = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data !== this.props.data){
          //Perform some operation here
          this.setState({
            description: this.props.data.description
          });
        }
       }

    render() {
        console.log(this.props.index)
        return (
            <div>
                <Modal show={this.props.showUpdate}>
                    <Modal.Header>
                        <Modal.Title>Todo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Label>Todo</Form.Label>
                            <Form.Control type="text" placeholder="Update Todo.." value={this.state.description} onChange={(event) => this.updateTodo(event)} />
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" onClick={this.props.handleCloseUpdate} >
                            Close
                        </Button>
                        <Button variant="dark" onClick={() => this.props.handleUpdateTodo(this.state.description)} >
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default ModalComponent;