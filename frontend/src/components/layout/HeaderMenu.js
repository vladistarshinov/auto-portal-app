import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/auth.actions";
import Avatar from "@mui/material/Avatar";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import GroupIcon from "@mui/icons-material/Group";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import Logout from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

const HeaderMenu = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [anchorMenuEl, setAnchorMenuEl] = React.useState(null);
  const openMenu = Boolean(anchorMenuEl);
  const handleMenuClick = (event) => {
    setAnchorMenuEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorMenuEl(null);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ my: { sm: 1, xs: 1 } }}>
      {userInfo ? (
        <>
          <Button
            onClick={handleMenuClick}
            size="small"
            sx={{
              ml: 2,
              color: "text.muted",
              "&:focus": {
                outline: "none",
                color: "inherit",
              },
            }}
            aria-controls={openMenu ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
          >
            <Avatar sx={{ mr: 1 }}>{userInfo.name.charAt(0)}</Avatar>
            {userInfo.name}
          </Button>
          <Menu
            anchorEl={anchorMenuEl}
            id="account-menu"
            open={openMenu}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {userInfo && userInfo.isAdmin && (
              <>
                <Link href="/admin/users" underline="none" color="text.muted">
                  <MenuItem>
                    <AdminPanelSettingsIcon /> Админ. панель
                  </MenuItem>
                </Link>
                <Link href="/admin/users" underline="none" color="text.muted">
                  <MenuItem>
                    <ListItemIcon>
                      <GroupIcon fontSize="small" />
                    </ListItemIcon>
                    Пользователи
                  </MenuItem>
                </Link>
                <Link
                  href="/admin/products"
                  underline="none"
                  color="text.muted"
                >
                  <MenuItem>
                    <ListItemIcon>
                      <Inventory2Icon fontSize="small" />
                    </ListItemIcon>
                    Товары
                  </MenuItem>
                </Link>
                <Link href="/admin/orders" underline="none" color="text.muted">
                  <MenuItem>
                    <ListItemIcon>
                      <BookmarksIcon fontSize="small" />
                    </ListItemIcon>
                    Заказы
                  </MenuItem>
                </Link>
                <Divider />
              </>
            )}
            <Link href="/profile" underline="none" color="text.muted">
              <MenuItem>
                <Avatar />
                Личный кабинет
              </MenuItem>
            </Link>
            <Divider />
            <MenuItem onClick={logoutHandler}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Link href="/login" underline="none" color="text.muted">
          Авторизация
        </Link>
      )}
    </Box>
  );
};

export default HeaderMenu;
