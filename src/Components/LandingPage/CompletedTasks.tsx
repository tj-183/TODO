import * as React from 'react';
import { styled } from 'styled-components';
import { Row, Col } from 'react-bootstrap';

const CompletedBar = styled.div`
`;

const CompletedSpan = styled(Row)`
    text-align: center;
`;
const CompletedTasks = (props) => {
    return (
        <>
            {props.tasks.map((task, index) => {
                return task.isDone ? <></> : <CompletedSpan key={index}>{task.name}</CompletedSpan>
            })}
        </>
    )
}

export default CompletedTasks;