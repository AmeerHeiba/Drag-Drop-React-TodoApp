import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "@mui/system";

const Title = styled("div")(({ theme }) => ({
  marginBottom: "1.5px",
  color: theme.palette.text.secondary,
}));

const SubTitle = styled("span")(({ theme }) => ({
  marginBottom: "1.5px",
  color: theme.palette.text.primary,
  fontWeight: "bold",
}));

const Heading = styled("div")(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: "bold",
  fontSize: "16px",
}));

const TodoCard = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Card sx={{ minWidth: 275, m: "10px 2px", mt: "20px", background: "rgba(255, 243, 117, 1)" }}>
            <CardContent sx={{ p: "0 16px" }}>
              <Heading sx={{ my: "10px" }}>{item.assigned_To}</Heading>
              <Typography sx={{ fontSize: 18 }} color="black" gutterBottom>
                {item.task}
              </Typography>
              <Box sx={{ flexGrow: 1, color: "text.secondary", m: "20px 0 0" }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={2} sm={4} md={4}>
                    <Title>Assignee</Title>
                    <SubTitle>{item.assignee}</SubTitle>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <Title>Priority</Title>
                    <SubTitle>{item.priority}</SubTitle>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <Title>Due Date</Title>
                    <SubTitle>{item.due_Date}</SubTitle>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TodoCard;
