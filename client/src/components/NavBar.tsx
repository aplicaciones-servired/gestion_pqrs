import { LogoutAndDeleteToken } from '../services/LogOut';
import { useAuth } from '../auth/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';

function NavBar() {
  const { setIsAuthenticated } = useAuth();
  
  const handleClick = () => {
    LogoutAndDeleteToken()
    setIsAuthenticated(false)
  };

  return (
    <nav className='border-r px-2 py-4 flex flex-col justify-between items-center gap-6 h-screen'>
      <div className='flex flex-col items-center gap-2'>
        <ul className=''>
          <li className='flex flex-col gap-2'>
  
          </li>
        </ul>
      </div>
      <IconButton aria-label="delete" size="large" color="inherit" onClick={handleClick}>
        <LogoutIcon fontSize="inherit" />
      </IconButton>
    </nav>
  );
}

export default NavBar;
