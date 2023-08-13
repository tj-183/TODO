import * as React from 'react';
import { styled } from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import {Loader} from '../Constants.tsx';
import { useState } from 'react';


const BoardBar = styled(Row)`
    display: flex;
    justify-content: center;
`;

const BoardSpan = styled(Col)`

`;
const Row1 = styled(Row)`
  display: flex;
  margin-top: 50px;
  justify-content: center;
`;
const Select = styled.select`
    width: 300px;
`;
const BoardPanel = (props) => {

    const [board, setBoard] = useState("Select a board");

    const [name, setName] = useState('');

    let handleSelectBoard = (e) => {
        console.log(e);
        var index = e.nativeEvent.target.selectedIndex;
        var name = e.nativeEvent.target[index].text;
        const { value } = e.target;
        setBoard(value);
        setName(name);
        props.getTasks(value);
        props.setSelectedBoard(value);
      }

    if (props.boards.length === 0) {
        return <Loader />
    }
    else {
        return (
            <div>

                <BoardBar>
                    <Select onChange={handleSelectBoard}> 
                        <option value="Select a board"> -- Select a board -- </option>
                        {props.boards.map((board, index) => <option value={board.id} key={index}>{board.name}</option>)}
                    </Select>

                </BoardBar>
                {name && name !== '-- Select a board --' &&
                    <Row1>
                        {name} <button onClick={()=>{props.handleDelete(board); setName('');}}>X</button>
                    </Row1>
                }

            </div>

        )
    }
}

export default BoardPanel;