import AddIcon from "@mui/icons-material/Add";
import { Paper, Card, Fab, Modal, IconButton } from "@mui/material";
import { GetTodoItems, DeleteItem } from "./TodoApi";
import { useState, React, useEffect } from "react";
import NewTodoItem from "./NewTodoItem";
import { DeleteOutline } from "@mui/icons-material";

const TodoList = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);

  const onClose = () => {
    setAnchorEl(null);
  };

  const closeModal = (refreshList) => {
    setOpenModal(false);

    if (refreshList) {
      fetchData();
    }
  };

  const deleteItem = (id) => {
    DeleteItem(id);

    fetchData();
  };

  const fetchData = () => {
    GetTodoItems().then((items) => {
      setTodoItems(items);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        width: "98%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          mr: 2,
          mt: 1,
          py: 2,
          px: 2,
          height: 20,
          bgcolor: "#c4421a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 155,
        }}
      >
        <h2
          style={{
            borderRadius: "10px",
            margin: 0,
            padding: "0",
            color: "white",
          }}
        >
          TODO
        </h2>
      </Paper>
      <Card
        className="results-item"
        style={{
          overflowY: "auto",
          height: 500,
          width: "90%",
          marginTop: 10,
          padding: 10,
        }}
      >
        {todoItems &&
          todoItems.map((item) => (
            <Paper
              key={item.id}
              elevation={5}
              sx={{
                width: "90%",
                height: "auto",
                justifySelf: "center",
                mb: 2,
                padding: 2,
              }}
            >
              <div>{item.value}</div>
              <div
                style={{
                  marginLeft: "90%",
                }}
              >
                <IconButton
                  onClick={() => deleteItem(item.id)}
                  style={{ color: "red" }}
                >
                  <DeleteOutline />
                </IconButton>
              </div>
            </Paper>
          ))}
      </Card>
      <Fab
        onClick={() => setOpenModal(true)}
        color="primary"
        aria-label="add"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
      <Modal
        open={openModal}
        onClose={closeModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <NewTodoItem onCancel={closeModal} />
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
