import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardPanel from './BoardPanel.tsx';
import CompletedTasks from './CompletedTasks.tsx';
import ToDo from './ToDo.tsx';
import { Row, Col } from 'react-bootstrap';
import NewTask from './NewTask.tsx';

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
const NewTaskWrapper = styled.div`
  background: grey;
  width: 40%;
  display: block;
  justify-content: center;
  height: 400px;
`;
const Row1 = styled(Row)`
  display: flex;
  margin-top: 50px;
  justify-content: center;
`;
const Row2 = styled(Row)`
  display: flex;
  margin-top: 50px;
`;
const LandingPage = () => {

    let [boards, setBoards] = useState([]);
    let [tasks, setTasks] = useState([]);
    let [selectedBoard, setSelectedBoard] = useState(null);

    const handleDelete = (id) => {
      
      
      fetch(
          `http://localhost:5000/delete/board/${id}`,
          {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id })
          }
      )
      .then(response => {
          
          
          

          if (response.status===200) {
              getBoards();
          }
          
      })
  }
  const handleDeleteTask = (id) => {
    
    
    fetch(
        `http://localhost:5000/delete/task/${id}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        }
    )
    .then(response => {
        
        
        

        if (response.status===200) {
            getTasks(selectedBoard);
        }
        
    })
  }

  const handleCheck = (id) => {
    fetch(
      `http://localhost:5000/complete/task/${id}`,
      {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
      }
  )
  .then(response => {
      console.log('in then');
      
      console.log(response);

      if (response.status===200) {
          getTasks(selectedBoard);
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

      const getTasks = (boardId) => {
        fetch
        (`http://localhost:5000/tasks/${boardId}`,
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
            console.log(tasks);
            if (tasks.status === 200) {
              setTasks(tasks.rows)
            }
            else {
              setTasks([{name: "No tasks found"}]);
            }
          });
      }

      const addNewTask = (boardId, name, description) => {
        
        fetch
        ('http://localhost:5000/add/task',
        {
          method: 'POST',
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           },
           body: JSON.stringify({
            boardId,
            name,
            description
           })
        })
          .then(function(response){
            console.log(response);
            
            return response.json();
          })
          .then(function(tasks) {
            
            if (tasks.status === 200) {
              getTasks(boardId);
            }
            
          });
      }
      useEffect(() => {
        getBoards();
      }, []);

      return (
        <Wrapper>
          <Row>
            <BoardPanel boards={boards} handleDelete={handleDelete} getTasks={getTasks} setSelectedBoard={setSelectedBoard}/>
          </Row>
          <Row2>
            <ToDoWrapper>
              <ToDo tasks={tasks} handleCheck={handleCheck} handleDeleteTask={handleDeleteTask}/>
            </ToDoWrapper>
            <NewTaskWrapper>
              <NewTask boardId={selectedBoard} submit={addNewTask} />
              
            </NewTaskWrapper>
            <CompletedWrapper>
              <CompletedTasks tasks={tasks} />
            </CompletedWrapper>
          </Row2>

        </Wrapper>
      );
}


export default LandingPage;