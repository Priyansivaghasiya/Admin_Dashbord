import { Search, Add } from './assets/dashborad'
import BasicExample from './dropedown'
import Button from '@mui/material/Button';
import SimpleDialog from '@mui/material/Dialog';
import { useEffect, useState } from 'react'
import AddUserForm from './Adduser';
import { serching } from './Slice';
import { useDispatch } from 'react-redux';


export function Userboard({ id , setId}) {
  console.log(id);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

    useEffect(
    () => {
      setOpen(id ? true : false);
    }, [id])
  
  
  const dispatch = useDispatch();

  const handleAddUserClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setId(null);
    setOpen(false);
  };

  const handlesearch = (e) => {
    const query = e.target.value;
    setSearchText(query);

    if (query === '') {
      dispatch(serching(''));
    } else {
      dispatch(serching(query.trim()));
    }
  };

  return (
    <div className="Userdashboard">
      <h1>Users Dashboard</h1>
      <div className="searchbarmain">
        <div className="searchbar">
          <Search className='serchicon' />
          <input className="search" type="search" placeholder="Search" onChange={handlesearch}
            value={searchText}
          />
        </div>
        <div className="Addbuttom">
          <Button variant="outlined" onClick={handleAddUserClick}>
            Add user
          </Button>
          <Add />
        </div>
        <div className="sortby">
          <BasicExample />
        </div>
      </div>
      <SimpleDialog
        open={open}
        onClose={handleClose} fullWidth maxWidth="lg" >
        <AddUserForm handleClose={handleClose} id={id} />
      </SimpleDialog>
    </div>

  )
}