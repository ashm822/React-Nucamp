
import React from 'react';
import { Card, CardImg, CardText, CardBody, ModalHeader, ModalBody, Breadcrumb, Col, Label, BreadcrumbItem, Modal, Button, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    toggleModal = () => {
        this.setState(prev => ({ isOpen: !prev.isOpen }))
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal} className="fa fa-pencil"> Submit Comment</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
                    <ModalHeader className="bg-light" toggle={this.toggleModal}>
                        Submit Comment
                        </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" className="form-control">
                                        <option value selected hidden>Select...</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".name" id="name" name="name" placeholder="Enter your name" className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }} >

                                    </Control.text>
                                    <Errors className="text-danger"
                                        model=".name"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Please enter a name.',
                                            minLength: 'Your name must be more than 2 chars.',
                                            maxLength:  'Your name must not exceed more than 15 chars.'
                                        }} />

                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea rows="8" model=".comment" id="comment" 
                                    name="comment" className="form-control">
                                    </Control.textarea>
                                </Col>
                            </Row>
                            <Button type="Submit" color="primary"> Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>

        );
    }

}

function RenderCampsite({ campsite }) {
    return (
        <div className='col-md-5 m-1'>
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
};
function RenderComments({comments, addComment, campsiteId}) {
    if (comments) {
        return (
            <div className='col-md-5 m-1'>
                <h4>Comments</h4>
                {comments.map(comment =>
                    <div key={comment.id}>
                        <hr />
                        <p>{comment.text} </p>
                        <p><em>--{comment.author}</em>,
                                {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric', month: 'short', day: '2-digit'
                        }).format(new Date(Date.parse(comment.date)))}
                        </p>
                    </div>
                )}
                <hr />
                <CommentForm campsiteId={campsiteId} addComment={addComment} /> 
            </div>
        );
    }
    return <div />
}

function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if (props.campsite) {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments}
                    addComment={props.addComment}
                    campsiteId={props.campsite.id} />
                </div>
            </div>
        )
    } else {
        return <div></div>
    }
}
export default CampsiteInfo;