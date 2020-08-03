import React from 'react';
import {} from 'reactstrap';


function RenderLeader({leader}) {
    return (
        <Media tag="li">
            <Media left middle>
                <Media object src={leader.image} alt={leader.name} />
            </Media>
            <Media body className="ml-5">
                <Media heading>{leader.name}</Media>
                <p>{leader.designation}</p>
                <p>{leader.description}</p>
            </Media>
        </Media>
    );
}

const leader = (props) => {
    const menu = props.leaders.map(leader => {
        return (
            <div key={leader.id} className='col-12 col-md-5 m-1'>
                <RenderLeader leader={leader} />
            </div>
        );
    });
}

export default RenderLeader;