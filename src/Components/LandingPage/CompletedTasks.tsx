import * as React from 'react';
import { styled } from 'styled-components';
import { Row, Col } from 'react-bootstrap';

const CompletedBar = styled.div`
`;

const CompletedSpan = styled(Row)`
    text-align: center;
`;

const Heading = styled.h3`
    display: flex;
    justify-content: center;
`;

const CompletedTasks = (props) => {
    return (
        <>
        <Heading>Completed Tasks</Heading>

            {props.tasks.map((task) => {
                return !task.isDone ? <></> : <CompletedSpan key={task.id}>{task.name}</CompletedSpan>
            })}
        </>
    )
}

export default CompletedTasks;