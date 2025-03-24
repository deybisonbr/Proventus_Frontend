import { useEffect, useRef, useState } from 'react';
import './ContentMainComponents.css'
import MainMenuLeft from './MainMenuLeft';
import MainMenuNotifications from './MainMenuNotifications';
import { useNavigate } from 'react-router-dom';

const  ContentMainComponents = ({children}) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [hasUnread, setHasUnread] = useState(false);
    const [userData, setUserData] = useState(null); // Novo estado para os dados do usuário
    const navigate = useNavigate(); 

    // Referências para o menu e notificações
    const menuRef = useRef(null);
    const notificationRef = useRef(null);

    // Fetch para notificações
    const fetchNotifications = async () => {
        try {
          const token = sessionStorage.getItem('token'); // Substitua com a lógica para pegar seu token

          const response = await fetch(`${import.meta.env.VITE_API_URL}/notification/user`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json',
            }
          });


          if (!response.ok) {
            throw new Error('Falha ao carregar as notificações');
          }

          const data = await response.json();

          console.log(data);
          const sortedNotifications = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setNotifications(sortedNotifications.slice(0, 10));

          const unreadNotifications = sortedNotifications.some((notif) => !notif.read);
          setHasUnread(unreadNotifications);

        } catch (error) {
          console.error('Erro ao carregar notificações:', error);
        }
    };

    // Fetch para os dados do usuário
    const fetchUserData = async () => {
        try {
          const token = sessionStorage.getItem('token'); // Substitua com a lógica para pegar seu token

          const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          });

          if (!response.ok) {
            throw new Error('Falha ao carregar os dados do usuário');
          }

          const data = await response.json();
          setUserData(data); // Atualiza os dados do usuário

        } catch (error) {
          console.error('Erro ao carregar os dados do usuário:', error);
        }
    };

    // useEffect para ambos os fetches
    useEffect(() => {
        fetchNotifications();
        fetchUserData(); // Adiciona o fetch para carregar os dados do usuário

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setNotificationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleNotificationClick = () => {
        setNotificationOpen(!notificationOpen);
    };

    const handleNotificationLink = (url) => {
        navigate(url); 
    };

return (
    <div className="contains_main_components">
        <MainMenuNotifications 
        active_notification="active"
        menuOpen={menuOpen}  
        notificationOpen ={notificationOpen} 
        notifications={notifications}
        hasUnread={hasUnread}
        userData={userData}
        handleNotificationClick={handleNotificationClick}
        handleNotificationLink={handleNotificationLink}
        menuRef={menuRef}
        notificationRef={notificationRef}
        setMenuOpen={setMenuOpen}
        />
        <div className="box_aside_main">
            <MainMenuLeft />
            <main className="contains_main">
                {children}
            </main>
        </div>
    </div>
)

}

export default ContentMainComponents;