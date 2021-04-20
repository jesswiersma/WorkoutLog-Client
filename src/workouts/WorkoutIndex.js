import React, { useState, useEffect } from 'react';
import {Container, Row, Col} from 'reactstrap';
import WorkoutCreate from './WorkoutCreate';
import WorkoutTable from './WorkoutTable';
import WorkoutEdit from './WorkoutEdit';
import WorkoutDelete from './WorkoutDelete';

const WorkoutIndex = (props) => {
    const [workouts, setWorkouts] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [workoutToUpdate, setWorkoutToUpdate] = useState({});
    const [deleteActive, setDeleteActive] = useState(false);

    const fetchWorkouts = () => {

        fetch('http://localhost:3030/log/mylogs', {
            method: "GET", 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
        .then((json) =>  setWorkouts(json))
        .catch((err) => console.log(err))
    };

    useEffect(() => {
        fetchWorkouts();
        console.log(workouts)
    },[]);

    const editUpdateWorkout = (workout) => {
        setWorkoutToUpdate(workout);
        console.log(workout);
    };


    const updateOn = () => {
        setUpdateActive(true);
    };

    const updateOff = () => {
        setUpdateActive(false);
    };

    const deleteOn = () => {
        console.log(deleteActive);
        setDeleteActive(true);
    }

    const deleteOff = () => {
        console.log(deleteActive)
        setDeleteActive(false);
    }
        
    return(
        <Container>
            <Row>
                <Col md="3">
                    <WorkoutCreate 
                    //workouts = {workouts}
                    fetchWorkouts = {fetchWorkouts} 
                    token = {props.token}/>
                    {/* //owner_id = {props.owner_id}/> */}
                </Col>
                <Col md = "9">
                    <WorkoutTable 
                    workouts={workouts} 
                    editUpdateWorkout={editUpdateWorkout} updateOn = {updateOn} deleteOn = {deleteOn}
                    fetchWorkouts={fetchWorkouts} 
                    token = {props.token}/>
                    {/* // owner_id = {props.owner_id}/> */}
                </Col>
                {updateActive ? 
                <WorkoutEdit 
                workoutToUpdate = {workoutToUpdate} updateOff = {updateOff}
                token={props.token} 
                // workouts = {workouts}
                fetchWorkouts = {fetchWorkouts}/>:<></>}

                {deleteActive ? <WorkoutDelete workoutToUpdate = {workoutToUpdate}
            deleteOff = {deleteOff} token = {props.token} fetchWorkouts = {fetchWorkouts}/> : <></>}
            </Row>
        </Container>
    );
};

export default WorkoutIndex;