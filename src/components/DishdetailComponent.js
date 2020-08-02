import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
    else {
        return (<div></div>)
    }
}
function RenderComments({ comments }) {
    const cmnts = comments.map(comment => {
        return (
            <div key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit'
                }).format(new Date(Date.parse(comment.date)))}
                </p>
            </div>
        )
    })
    if (comments != null) {
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <div>
                    {cmnts}
                </div>

            </div>
        )
    } else {
        return (<div></div>);
    }
}

const Dishdetail = (props) => {
    if (props.dish != null) {
        return (
            <div className='row'>
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.dish.comments} />
            </div>
        )
    } else {
        return (<div></div>);
    }
}

export default Dishdetail