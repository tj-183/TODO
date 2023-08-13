import * as React from 'react';
import { styled } from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';


const InputWrapper = styled.div`
    display: grid;
    justify-content: center;
`;


const NewTask = (props) => {

    const [description, setDescription] = useState('');

    const [name, setName] = useState('');

    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    return (
        <>
            <h3>Add a New task in the current board</h3>

            <InputWrapper>
            <label htmlFor='name'>Name</label>
            <input id='name' type='text' value={name} onChange={handleChangeName}/>
            <br />
            <label htmlFor='description'>Description</label>
            <textarea value={description}
          onChange={handleChangeDescription} id='description' />
            <br />
            <button onClick={() => {props.submit(props.boardId, name, description); setName(''); setDescription('')}}>Submit</button>
            </InputWrapper>
        </>
    )
}

export default NewTask;