/* eslint-disable react/prop-types */
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Navbar from "../Navbar";
import TaskList from "../TaskList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../client";

const Home = () => {
  const [taskData, setTaskData] = useState([]);
  const [selectedTask, setSelectedTask] = useState({
    task: null,
    updating: false,
  });
  const sessionData = sessionStorage.getItem("token");
  const user = JSON.parse(sessionData)?.user;

  const [taskContent, setTaskContent] = useState("");
  const navigate = useNavigate();
  // const {data, setData} = useState();

  // const data = [
  //   { content: "This is task 1", dateTime: "28/06/2024 5:00PM" },
  //   { content: "This is task 2", dateTime: "28/06/2024 5:00PM" },
  //   { content: "This is task 3", dateTime: "28/06/2024 5:00PM" },
  //   { content: "This is task 4", dateTime: "28/06/2024 5:00PM" },
  // ];

  const handleAdd = (e) => {
    e.preventDefault();

    if (selectedTask?.updating) {
      updateTask(selectedTask?.task);
    } else {
      createTask(taskContent);
    }

    setTaskContent("");
  };

  const handleEdit = (e, task) => {
    e.preventDefault();
    setSelectedTask((prev) => ({ ...prev, task, updating: true }));
    setTaskContent(task?.content);
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await supabase.from("tasks").delete().eq("id", taskId);
      if (!response) {
        throw "Something went wrong!";
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      sessionStorage.removeItem("token");
      navigate("/login", { replace: true });
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error?.message);
    }
  };

  const getTasks = async () => {
    try {
      const { data, error } = await supabase.from("tasks").select("*");
      if (data) {
        setTaskData(data);
      } else if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (content) => {
    try {
      const { error } = await supabase.from("tasks").insert({
        content,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error?.message);
    }
  };

  const updateTask = async (task) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .update({ content: taskContent })
        .eq("id", task?.id);

      setSelectedTask((prev) => ({ ...prev, updating: false }));
      setTaskContent("");

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error?.message);
    }
  };

  useEffect(() => {
    getTasks();

    const changes = supabase
      .channel("tasks")
      .on(
        "postgres_changes",
        {
          event: "INSERT", // Listen only to INSERTs
          schema: "public",
        },
        (payload) => setTaskData((prevData) => [...prevData, payload.new])
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE", // Listen only to INSERTs
          schema: "public",
        },
        (payload) =>
          setTaskData((prevData) =>
            prevData.map((item) =>
              item.id === payload.new.id ? payload.new : item
            )
          )
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE", // Listen only to DELETEs
          schema: "public",
        },
        (payload) =>
          setTaskData((prevData) =>
            prevData.filter((item) => item.id !== payload.old.id)
          )
      )
      .subscribe();

    return () => {
      supabase.removeChannel(changes);
    };
  }, []);

  return (
    <>
      <Navbar
        profileName={user?.user_metadata?.fullName}
        signOut={handleSignOut}
      />
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
            {selectedTask?.updating ? "Update" : "Add"}
          </Button>
          <Button
            variant="contained"
            disabled={taskContent?.length <= 0}
            onClick={() => {
              setTaskContent("");
              setSelectedTask((prev) => ({ ...prev, updating: false }));
            }}
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
            <TaskList
              data={taskData}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
