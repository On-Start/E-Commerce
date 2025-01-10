import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
  Menu,
  MenuItem,
  TextField,
  InputBase,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import {
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/categorySlice";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  borderRadius: "15px",
  "&:hover": {
    border: "1.5px solid black",
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));



const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoriesState);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleProductsMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products/${category}`);
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "var(--sk-body-background-color, #fff)",
        boxShadow: "none",
        color: "text.primary",
        borderBottom: "solid #111111",
        opacity: "0.8",
      }}
    >
      <Toolbar
        sx={{
          p: 1,
          height: "4rem",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Typography
          variant="h6"
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer", flexGrow: 1, fontWeight: "bold" }}
        >
          E-Shop
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Button
          color="inherit"
          onClick={handleProductsMenu}
          sx={{ marginRight: 2 }}
        >
          Products
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {categories.map((category) => (
            <MenuItem
              key={category._id}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </MenuItem>
          ))}
        </Menu>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
