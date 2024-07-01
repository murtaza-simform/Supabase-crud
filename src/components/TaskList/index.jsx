/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { memo } from "react";
import { Grid } from "@mui/material";
import Task from "./Task";

const TaskList = ({ data, handleEdit, handleDelete }) => {
  return (
    <Grid container spacing={2}>
      {data &&
        data?.map((task, index) => (
          <Grid item xs={12} md={6} lg={4} gap={2} key={index}>
            <Task task={task} handleEdit={handleEdit} handleDelete={handleDelete}/>
          </Grid>
        ))}
    </Grid>
  );
};

export default memo(TaskList);
