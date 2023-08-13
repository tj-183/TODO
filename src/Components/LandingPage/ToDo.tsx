import * as React from 'react';
import { styled } from 'styled-components';
import { Row, Col } from 'react-bootstrap';

const TodoBar = styled.div`
`;

const TodoSpan = styled(Row)`
text-align: center;
`;

const ToDo = (props) => {
    return (
        <>
            {props.tasks.map((task, index) => {
                return task.isDone ? <></> : <TodoSpan key={index}>{task.name} <button>X</button></TodoSpan>
            })}
        </>
    )
}

export default ToDo;