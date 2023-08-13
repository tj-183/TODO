import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardPanel from './BoardPanel.tsx';
import CompletedTasks from './CompletedTasks.tsx';
import ToDo from './ToDo.tsx';
import { Row, Col } from 'react-bootstrap';

const Wrapper = styled.div`
    margin-top: 100px;
    margin: 10%

`;
const ToDoWrapper = styled.div`
  width: 30%
`;
const CompletedWrapper = styled.div`
  width: 30%;
`;
const NewTask = styled.div`
  background: grey;
  width: 40%
`;
const Row2 = styled(Row)`
  display: flex;
  margin-top: 50px;
`;
const LandingPage = () => {

    let [boards, setBoards] = useState([]);
    let [tasks, setTasks] = useState([]);


    const handleDelete = (board) => {
      console.log('handle delete called');
      console.log(board);
      fetch(
          `http://localhost:5000/delete/board/${board.id}`,
          {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: board.id })
          }
      )
      .then(response => {
          console.log('in then');
          
          console.log(response);

          if (response.status===200) {
              getBoards();
          }
          
      })
      
  }

    const getBoards = () => {
        fetch
        ('http://localhost:5000/boards',
        {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           },
        })
          .then(function(response){
            return response.json();
          })
          .then(function(boards) {
            setBoards(boards)
          });
      };

      const getTasks = () => {
        fetch
        ('http://localhost:5000/tasks',
        {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        })
          .then(function(response){
            return response.json();
          })
          .then(function(tasks) {
            setTasks(tasks)
          });
      }

      useEffect(() => {
        getBoards();
        getTasks();
      }, []);

      return (
        <Wrapper>
          <Row>
            <BoardPanel boards={boards} handleDelete={handleDelete}/>
          </Row>
          <Row2>
            <ToDoWrapper>
              <ToDo tasks={tasks}/>
            </ToDoWrapper>
            <NewTask>
              New Task here
            </NewTask>
            <CompletedWrapper>
              <CompletedTasks tasks={tasks} />
            </CompletedWrapper>
          </Row2>

        </Wrapper>
      );
}


export default LandingPage;