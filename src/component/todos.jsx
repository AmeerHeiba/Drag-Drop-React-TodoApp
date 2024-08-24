import React, { useState } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Grid, Box, TextField, Button, Divider } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import TodoCard from "./todoCard";

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  padding: "20px",
}));

const TaskList = styled("div")(({ theme }) => ({
  minHeight: "100px",
  display: "flex",
  flexDirection: "column",
  background: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.divider}`,
  minWidth: "341px",
  borderRadius: "16px",
  padding: "40px",
  marginRight: "20px",
}));

const Title = styled("span")(({ theme }) => ({
  font: "Roboto",
  fontWeight: "400",
  color: theme.palette.primary.main,
  fontSize: 36,
  marginBottom: "10px",
}));

const initialColumns = {
  todo: { title: "To Do", items: [] },
  inProgress: { title: "Doing", items: [] },
  done: { title: "Done", items: [] },
};

const Kanban = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [newTask, setNewTask] = useState("");

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];

    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: { ...sourceColumn, items: sourceItems },
      [destination.droppableId]: { ...destColumn, items: destItems },
    });
  };

  const addTask = () => {
    if (newTask.trim() === "") return;

    const task = {
      id: uuidv4(),
      task: newTask,
      assigned_To: "New Task",
      assignee: "User1",
      priority: "Low",
      due_Date: "15/9/2024",
    };

    setColumns({
      ...columns,
      todo: {
        ...columns.todo,
        items: [...columns.todo.items, task],
      },
    });
    setNewTask("");
  };

  return (
    <div>
      <Box sx={{ mb: 2, mt: 3, display: 'flex', justifyContent: 'center' }}>
        <TextField
          label="New Task"
          variant="outlined"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          sx={{ mr: 2, width: "400px" }}
        />
        <Button
          sx={{ width: "150px", height: "55px", fontSize: "20px" }}
          variant="contained"
          color="primary"
          onClick={addTask}
        >
          Add Task
        </Button>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} style={{ flex: 1 }}>
              <Droppable type="group" droppableId={columnId}>
                {(provided) => (
                  <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                    <Box sx={{ width: "100%" }}>
                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={10}>
                          <Title>{column.title}</Title>
                        </Grid>
                      </Grid>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    {column.items.map((item, index) => (
                      <TodoCard key={item.id} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            </div>
          ))}
        </Container>
      </DragDropContext>
    </div>
  );
};

export default Kanban;