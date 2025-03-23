import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  return <ToastContainer position="bottom-left" autoClose={3000} />;
};

export default Toast;