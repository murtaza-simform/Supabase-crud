/* eslint-disable react/prop-types */
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ profileName, signOut }) => {
  const handleLogout = async () => {
    // try {
    //   const { error } = await supabase.auth.signOut();

    //   if (error) throw error;
    // } catch (error) {
    //   alert(error?.message);
    // }
    signOut();
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "purple", opacity: "0.8" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        {profileName && <FaUserCircle />}
        <Button color="inherit">{profileName}</Button> &nbsp; &nbsp;
        <Button color="inherit" variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
