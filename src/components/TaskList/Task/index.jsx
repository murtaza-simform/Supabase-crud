/* eslint-disable react/prop-types */
import { Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import { format } from "date-fns";
import { BiPencil, BiTrash } from "react-icons/bi";

const Task = ({ task, handleEdit, handleDelete}) => {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="body2"
          component={"p"}
          fontSize={16}
          color="text.secondary"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {task?.content}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          justifyContent: "space-between",
          marginTop: "20px",
          alignItems: "center",
          bgcolor: "ghostwhite",
        }}
      >
        <Typography
          variant="caption"
          component={"small"}
          color="text.secondary"
        >
          {format(task?.created_at, "dd/MM/yyyy hh:mm a")}
        </Typography>
        <div>
          <IconButton onClick={(e) => handleEdit(e, task)}  aria-label="edit">
            <BiPencil size={20} />
          </IconButton>
          <IconButton onClick={() => handleDelete(task?.id)} aria-label="delete">
            <BiTrash size={20} />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
}

export default Task
