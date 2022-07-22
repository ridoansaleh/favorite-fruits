import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  AppBar,
  Box,
  MenuItem,
  Toolbar,
  Typography,
  Menu,
  Divider,
} from "@mui/material";
import { Delete as DeleteIcon, AccountCircle } from "@mui/icons-material";
import "./home-style.css";
import UserContext from "../../userContext";
import { FRUITS, STORAGE } from "../../constants";

function Home() {
  const [selectedFruits, setSelectedFruits] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoverFruit, setHoverFruit] = useState("");
  const { user, onSetUser } = useContext(UserContext);
  const navigate = useNavigate();

  const selectedFruitsKey = `${user.username}-${STORAGE.SELECTED_FRUITS}`;

  const handleSelectFruit = (name) => {
    const allFruits = [...selectedFruits, name].sort();
    localStorage.setItem(selectedFruitsKey, JSON.stringify(allFruits));
    setSelectedFruits(allFruits);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteFruit = (fruit) => {
    const updatedFruits = selectedFruits.filter((d) => d !== fruit);
    localStorage.setItem(selectedFruitsKey, JSON.stringify(updatedFruits));
    setSelectedFruits(updatedFruits);
  };

  const handleSignOut = () => {
    sessionStorage.removeItem(STORAGE.ACTIVE_USER);
    onSetUser(null);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    let previousSelectedFruits = localStorage.getItem(selectedFruitsKey);
    previousSelectedFruits = previousSelectedFruits
      ? JSON.parse(previousSelectedFruits)
      : [];
    setSelectedFruits(previousSelectedFruits);
  }, [selectedFruitsKey]);

  return (
    <>
      <AppBar position="static">
        <Toolbar className="header-toolbar">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>{user.username}</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <main className="home-content">
        <p>Please pick your favorite fruits below!</p>
        <div className="fruit-list">
          {FRUITS.map((name, idx) => (
            <Chip
              key={idx}
              label={name}
              variant="outlined"
              disabled={selectedFruits.includes(name)}
              onClick={() => handleSelectFruit(name)}
            />
          ))}
        </div>
        <p className="favorite-fruits-label">Favorite fruits</p>
        <div id="selected-fruits">
          {selectedFruits.length === 0 ? (
            <Box
              component="div"
              sx={{
                p: 2,
                border: "1px dashed grey",
                marginTop: "15px",
                textAlign: "center",
              }}
            >
              <Typography variant="p" component="div">
                No favorite fruit
              </Typography>
            </Box>
          ) : (
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                padding: 0,
              }}
            >
              {selectedFruits.map((fruit, idx) => {
                return (
                  <div key={idx}>
                    <ListItem
                      sx={{ height: "60px" }}
                      secondaryAction={
                        hoverFruit === fruit ? (
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteFruit(fruit)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        ) : null
                      }
                      disablePadding
                      onMouseEnter={() => setHoverFruit(fruit)}
                      onMouseLeave={() => setHoverFruit("")}
                    >
                      <ListItemButton role={undefined}>
                        <ListItemText
                          id={`checkbox-list-label-${fruit}`}
                          primary={`${idx + 1}. ${fruit}`}
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </div>
                );
              })}
            </List>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
