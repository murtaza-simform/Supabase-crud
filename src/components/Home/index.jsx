/* eslint-disable react/prop-types */
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Navbar from "../Navbar";
import TaskList from "../TaskList";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const Home = () => {

  const { user, signOut } = useAuth();

  const [taskContent, setTaskContent] = useState('');
  const navigate= useNavigate();
  // const {data, setData} = useState();

  const data = [
    { content: "This is task 1", dateTime: "28/06/2024 5:00PM" },
    { content: "This is task 2", dateTime: "28/06/2024 5:00PM" },
    { content: "This is task 3", dateTime: "28/06/2024 5:00PM" },
    { content: "This is task 4", dateTime: "28/06/2024 5:00PM" },
  ];

  const handleAdd = e => {
    e.preventDefault();
    console.log(taskContent)
    navigate("/about")
  }



  return (
    <>
      <Navbar profileName={user?.user_metadata?.fullName} signOut={signOut} />
      <Grid
        container
        sx={{
          bgcolor: "white",
          color: "white",
          opacity: "0.9",
          padding: "20px",
          width: "80%",
          margin: "auto",
          borderRadius: "10px",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <Grid item xl={10} lg={9} md={8} xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Textarea"
            name="taskContent"
            multiline
            rows={3}
            variant="outlined"
            fullWidth
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
          />
        </Grid>
        <Grid
          item
          xl={2}
          lg={3}
          md={4}
          xs={12}
          sx={{ mt: { xs: 2, sm: 2, md: 0, lg: 0, xl: 0 } }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            variant="contained"
            sx={{
              width: "10rem",
              marginBottom: "10px",
              backgroundColor: "slateblue",
              "&:hover": { backgroundColor: "slateblue" },
            }}
            disabled={taskContent?.length <= 0}
            onClick={handleAdd}
          >
            Add
          </Button>
          <Button
            variant="contained"
            disabled={taskContent?.length <= 0}
            onClick={() => setTaskContent("")}
            sx={{
              width: "10rem",
              backgroundColor: "slateblue",
              "&:hover": { backgroundColor: "slateblue" },
            }}
          >
            Clear
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Box
            component="fieldset"
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.23)",
              borderRadius: "4px",
              padding: "16px",
              marginTop: "16px",
              height: "70vh",

              overflowY: "scroll",
            }}
          >
            <Typography
              component="legend"
              variant="p"
              sx={{ marginBottom: "16px", color: "gray" }}
            >
              Task(s)
            </Typography>
            <TaskList data={data} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
