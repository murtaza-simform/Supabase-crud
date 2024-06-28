/* eslint-disable react/prop-types */
import { Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import { BiPencil, BiTrash } from "react-icons/bi";

const Task = ({title, content, dateTime}) => {
  return (
    <Card>
      <CardHeader
        action={
          <div>
            <IconButton aria-label="edit">
              <BiPencil />
            </IconButton>
            <IconButton aria-label="delete">
              <BiTrash />
            </IconButton>
          </div>
        }
        title={title}
        titleTypographyProps={{ fontSize: "16px" }}
      />
      <CardContent>
        <Typography
          variant="body2"
          component={"p"}
          fontSize={16}
          color="text.secondary"
        >
          {content}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ justifyContent: "end", marginTop: "20px" }}
      >
        <Typography variant="caption" color="text.secondary">
          {dateTime}
        </Typography>
      </CardActions>
    </Card>
  );
}

export default Task
