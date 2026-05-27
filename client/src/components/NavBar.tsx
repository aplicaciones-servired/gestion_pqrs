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
    <nav className='glass-panel sticky top-4 flex h-[calc(100vh-2rem)] w-20 self-start flex-col justify-between rounded-[2rem] border-r-0 px-3 py-4 sm:w-24'>
      <div className='flex flex-col items-center gap-4 pt-1'>
        <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-sm font-black text-white shadow-lg shadow-blue-500/25'>
          PQRS
        </div>
        <div className='hidden rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-700 sm:block'>
          Online
        </div>
      </div>
      <IconButton
        aria-label='Cerrar sesión'
        size='large'
        color='inherit'
        onClick={handleClick}
        sx={{
          borderRadius: '18px',
          border: '1px solid rgba(148, 163, 184, 0.25)',
          backgroundColor: 'rgba(255,255,255,0.78)',
          boxShadow: '0 12px 30px rgba(15,23,42,0.12)'
        }}
      >
        <LogoutIcon fontSize='inherit' />
      </IconButton>
    </nav>
  );
}

export default NavBar;
