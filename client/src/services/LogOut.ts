import { LOGIN_URL } from '../utils/contanst';
import axios from 'axios';

export const LogoutAndDeleteToken = async () => {
  const token = document.cookie;

  try {
    const res = await axios.post(`${LOGIN_URL}/logout`, { token });
    if (res.status === 200)
      return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};