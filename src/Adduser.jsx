import * as React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { X } from '@mui/icons-material';
import DialogTitle from '@mui/material/DialogTitle'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { addUser, editUser } from './Slice';

export default function AddUserForm(prpos) {
  const dispatch = useDispatch();
  const { handleClose, id } = prpos
  const [edituser] = useState(JSON.parse(localStorage.getItem('items'))?.find(item => item.Userid === id));
  console.log(edituser);


  const [errorMessage, setErrorMessage] = useState('');
  // const [InputValue, setInputValue] = useState('');
  const [data, setdata] = useState({
    Userid: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    username: '',
    Password: '',
    confirmPassword: '',
    role: '',
    SuperAdmin: { read: false, write: false, delete: false },
    admin: { read: false, write: false, delete: false },
    Employee: { read: false, write: false, delete: false },
    User: { read: false, write: false, delete: false }

  })
  useEffect(() => {
    if (edituser) {
      setdata({
        Userid: edituser.Userid,
        firstName: edituser.firstName,
        lastName: edituser.lastName,
        email: edituser.email,
        mobile: edituser.mobile,
        username: edituser.username,
        Password: edituser.Password,
        confirmPassword: edituser.confirmPassword,
        role: edituser.role,
        SuperAdmin: { ...edituser.SuperAdmin },
        admin: { ...edituser.admin },
        Employee: { ...edituser.Employee },
        User: { ...edituser.User }
      });
    }
  }, [edituser]);

  function adddata() {
    const { Userid, firstName, lastName, email, mobile, username, Password, confirmPassword, role } = data;
    console.log("adding")
    if (!Userid || !firstName || !lastName || !email || !mobile || !username || !Password || !confirmPassword || !role) {

      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (Password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const newItem = {
      Userid: data.Userid,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: data.mobile,
      username: data.username,
       Password: data.Password,
      confirmPassword: data.confirmPassword,
      role: data.role,
      SuperAdmin: data.SuperAdmin,
      admin: data.admin,
      Employee: data.Employee,
      User: data.User
    }
    if (id) {
      // Edit user
      dispatch(editUser(newItem)); // editUser action required in Redux
      console.log("User edited:", newItem);
  } else {
      // Add new user
      dispatch(addUser(newItem));
      console.log("User added:", newItem);
  }


    handleClose();
  }

  function input(event) {
    setdata((prev) => ({
      ...prev,
      [event.target.name]: event.target.value

    }));
  }


  function tablecheckbox(e) {
    const { name, checked } = e.target;
    const [role, permission] = name.split('.');

    setdata((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permission]: checked,
      },
    }));
  }

  return (
    <>
      <Box sx={{ padding: '1vw', width: '100%', overflowX: 'hidden', margin: '0 auto', marginTop: '-25px' }}>
        <div className='add'>
          <DialogTitle>{id ? "edit" : "Add"} User</DialogTitle>
          <CloseIcon onClick={handleClose}></CloseIcon>
        </div>
        {errorMessage && (
          <Box sx={{ color: 'red', marginBottom: '10px' }}>
            <strong>{errorMessage}</strong>
          </Box>
        )}
        <TextField placeholder="User ID *" required fullWidth size='small' value={data.Userid} sx={{ marginRight: '16px', marginBottom: '10px' }} onChange={input} name='Userid' />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <TextField placeholder="First Name *" required fullWidth size='small' value={data.firstName} sx={{ marginRight: '16px' }} onChange={input} name='firstName' />
          <TextField placeholder="Last Name *" required fullWidth size='small' value={data.lastName} onChange={input} name='lastName' />
        </div>

        <div style={{ display: 'flex', gap: '1vw' }}>
          <TextField placeholder="Email ID *" required fullWidth size='small' value={data.email} type='email' sx={{ marginBottom: '16px' }} onChange={input} name='email' />
          <TextField placeholder="Mobile No" type='number' fullWidth size='small' value={data.mobile} onChange={input} name='mobile' />

          <FormControl fullWidth size='small' >
            <InputLabel >Select Role Type</InputLabel>
            <Select required onChange={input} name='role'  value={data.role}>
              <MenuItem value="superadmin" >Super Admin</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
            </Select>
          </FormControl>

        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField placeholder="Username *" required fullWidth size='small' sx={{ marginRight: '16px' }} onChange={input}  value={data.username} name='username' />
          <TextField placeholder="Password *" required type="password" fullWidth size='small' sx={{ marginRight: '16px' }} onChange={input}  value={data.Password} name='Password' />
          <TextField placeholder="Confirm Password *" required type="password" fullWidth size='small' onChange={input}  value={data.confirmPassword} name='confirmPassword' />
        </div>

        <Box sx={{ marginTop: '10px' }}>

          <Table sx={{ minWidth: 600 }} size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#EFF4FA' }}>
                <TableCell>Module Permission</TableCell>
                <TableCell align="center">Read</TableCell>
                <TableCell align="center">Write</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              <TableRow sx={{ height: '0.5vh' }}>
                <TableCell sx={{ height: '0.5vh' }} >super Admin</TableCell>
                <TableCell sx={{ height: '0.5vh' }} align="center">
                  <Checkbox onChange={tablecheckbox} name='SuperAdmin.read' checked={data.SuperAdmin.read} />
                </TableCell>
                <TableCell sx={{ height: '0.5vh' }} align="center">
                  <Checkbox onChange={tablecheckbox} name='SuperAdmin.write' checked={data.SuperAdmin.write} />
                </TableCell>
                <TableCell sx={{ height: '0.5vh' }} align="center">
                  <Checkbox onChange={tablecheckbox} name='SuperAdmin.delete' checked={data.SuperAdmin.delete} />
                </TableCell>
              </TableRow>

              <TableRow sx={{ height: '1vh' }}>
                <TableCell sx={{ height: '1vh' }} > Admin</TableCell>
                <TableCell sx={{ height: '1vh' }} align="center">
                  <Checkbox onChange={tablecheckbox} name='admin.read' checked={data.admin.read} />
                </TableCell>
                <TableCell sx={{ height: '1vh' }} align="center">
                  <Checkbox onChange={tablecheckbox} name='admin.write' checked={data.admin.write} />
                </TableCell>
                <TableCell sx={{ height: '1vh' }} align="center">
                  <Checkbox onChange={tablecheckbox} name='admin.delete' checked={data.admin.delete} />
                </TableCell>
              </TableRow>

              <TableRow sx={{ height: '1vh' }}>
                <TableCell sx={{ height: '1vh' }} >Employee</TableCell>
                <TableCell sx={{ height: '1vh' }} align="center">
                  <Checkbox onChange={tablecheckbox} name='Employee.read' checked={data.Employee.read} />
                </TableCell>
                <TableCell sx={{ height: '1vh' }} align="center">
                  <Checkbox onChange={tablecheckbox} name='Employee.write' checked={data.Employee.write} />
                </TableCell>
                <TableCell sx={{ height: '1vh' }} align="center">
                  <Checkbox onChange={tablecheckbox} name='Employee.delete' checked={data.Employee.delete} />
                </TableCell>
              </TableRow>

              <TableRow sx={{ height: '1vh' }}>
                <TableCell sx={{ height: '1vh' }} >User</TableCell>
                <TableCell sx={{ height: '1vh' }} align="center">
                  <Checkbox onChange={tablecheckbox} name='User.read' checked={data.User.read} />
                </TableCell>
                <TableCell sx={{ height: '1vh' }} align="center">
                  <Checkbox onChange={tablecheckbox} name='User.write' checked={data.User.write} />
                </TableCell>
                <TableCell sx={{ height: '1vh' }} align="center">
                  <Checkbox onChange={tablecheckbox} name='User.delete' checked={data.User.delete} />
                </TableCell>
              </TableRow>


            </TableBody>
          </Table>

        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px', gap: '2vw' }}>
          <Button variant="contained" color="primary" onClick={adddata}>
            {id ? "edit" : "Add"} User
          </Button>
          <Button variant="text" color="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
}