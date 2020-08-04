import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)

class CommentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    handleSubmit = (values) => {
        alert(JSON.stringify(values))
    }

    toggle = () => this.setState({ modal: !(this.state.modal) })

    render() {
        return (
            <div>
                <Button onClick={this.toggle} outline color='secondary'><i className='fa fa-lg fa-edit'></i>Submit comment</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className='commentForm'>
                    <ModalHeader toggle={this.toggle}>
                        Submit Comment
          </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label>
                                        Rating
                                    </Label>
                                    <Control.select model='.rating' name='rating' className='form-control'>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor='name'>Your name</Label>
                                    <Control.text model='.name'
                                        id='name' name='name'
                                        placeholder="Name"
                                        className='form-control'
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }} />
                                    <Errors
                                        className='text-danger'
                                        model='.name'
                                        show='touched'
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor='message'>Comment</Label>
                                    <Control.textarea model='.message' id='message' name='message' rows='6' className='form-control' />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Button type='submit' color='primary' onClick={this.toggle}>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


function RenderComments({ comments }) {
    if (comments == null) {
        return (<div></div>);
    }
    var com = comments.map(comment => {
        return (
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>--{comment.author},
          &nbsp;
          {new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    year: 'numeric',
                    day: '2-digit'
                }).format(new Date(Date.parse(comment.date)))}
                </p>
            </li>
        );
    })
    return (
        <div className='col-12 col-md-5 m-1'>
            <h4>Comments</h4>
            <ul className='list-unstyled'>
                {com}
            </ul>
            <CommentForm />
        </div>
    );

}

function RenderDish({ dish }) {
    if (dish == null) {
        return (<div></div>);
    }
    return (
        <div className='col-12 col-md-5 m-1'>
            <Card>
                <CardImg width='100%' src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

const DishDetail = (props) => {

    return (
        <div className='container'>
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className='row'>
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.comments} />
            </div>
        </div>
    );
}

export default DishDetail;