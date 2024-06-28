/* eslint-disable react/prop-types */
import { Grid } from "@mui/material"
import Task from "./Task"


const TaskList = ({data}) => {
  return (
    <Grid container spacing={2}>
      {data &&
        data?.map((task, index) => (
          <Grid item xs={12} md={6} lg={4} gap={2} key={index}>
            <Task
              title={`Task ${index + 1}`}
              content={task?.content}
              dateTime={task?.dateTime}
            />
          </Grid>
        ))}
    </Grid>
  );
}

export default TaskList
