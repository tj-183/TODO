import * as React from 'react';
import { styled } from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';

const TodoBar = styled.div`
`;

const TodoSpan = styled(Row)`
    text-align: center;
`;

const Heading = styled.h3`
    display: flex;
    justify-content: center;
`;

const ToDo = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    
    const handleCheckboxChange = () => {
        setIsChecked(false);
    };

    return (
        <>
        <Heading>Tasks lined up</Heading>
            {props.tasks.map((task) => {
                return task.isDone ? <></> : <TodoSpan key={task.id}>{task.name} <input type='checkbox' checked={isChecked} id={task.id} onChange={handleCheckboxChange} onClick={() => props.handleCheck(task.id)}/> <button onClick={()=>{props.handleDeleteTask(task.id);}}>X</button></TodoSpan>
            })}
        </>
    )
}

export default ToDo;