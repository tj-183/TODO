import * as React from 'react';
import { styled } from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import {Loader} from '../Constants.tsx';


const BoardBar = styled(Row)`
    display: flex;
    justify-content: center;
`;

const BoardSpan = styled(Col)`

`;

const BoardPanel = (props) => {

    if (props.boards.length === 0) {
        return <Loader />
    }
    else {
        return (
            <BoardBar>
                {props.boards.map((board, index) => {
                    return board.isDeleted ? <></> : <BoardSpan xs={4} key={index}>{board.name} <button onClick={() => props.handleDelete(board)}>X</button></BoardSpan>
                })}
            </BoardBar>
        )

    }
}

export default BoardPanel;