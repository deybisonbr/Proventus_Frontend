import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Usando React Router

import MenuNotificationIcon from '../../assets/images/menu_notification_icon.svg';
import NotificationIcon from '../../assets/images/notification_icon.svg';
import ArrowContextUserMenuIcon from '../../assets/images/arrow_context_user_menu_icon.svg';
import Profile from '../../assets/images/profile.png';

const MainMenuNotifications = ({ active_notification }) => {
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
        <nav className="main_menu_notifications_content" style={{ position: 'relative' }}>
            <div className="content_icon_menu">
                <img src={MenuNotificationIcon} alt="Menu" />
            </div>

            <div className="user_notification_content" style={{ position: 'relative' }}>
                <span
                    className="notification_icon"
                    onClick={handleNotificationClick}
                    style={{ cursor: 'pointer', position: 'relative' }}
                >
                    {hasUnread && <div className={`notificantion_simbol ${active_notification}`}></div>}
                    <img src={NotificationIcon} alt="Notification" />
                </span>

                <AnimatePresence>
                    {notificationOpen && (
                        <motion.div
                            ref={notificationRef}
                            className="notification_dropdown"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h4>Notificações</h4>
                            {notifications.length === 0 ? (
                                <p>Carregando...</p>
                            ) : (
                                <ul>
                                    {notifications.map((notif) => (
                                        <li key={notif.id}>
                                            <a className='notification_redirect_link' href="#" onClick={() => handleNotificationLink(notif.url)}>
                                                <span className={`notification_user_read ${notif.read ? "true" : ""}`}></span><p> {notif.title}</p>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="user_menu" ref={menuRef}>
                    <img src={Profile} alt="Profile" />

                    <div
                        className="name_description"
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{ cursor: 'pointer' }}
                    >
                        <span>{userData ? userData.name : 'Carregando...'}</span>
                        <p>{userData ? userData.occupation : 'Carregando...'}</p>
                    </div>

                    <motion.img
                        src={ArrowContextUserMenuIcon}
                        alt="Arrow"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="arrow_down_context_menu_user"
                        animate={{ rotate: menuOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    />

                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                className="dropdown_menu"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ul>
                                    <li className='menu_user_item'>👤 Perfil</li>
                                    <li className='menu_user_item'>⚙️ Configurações</li>
                                    <li className='menu_user_item'><a href="/logout">🚪 Sair</a></li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
};

export default MainMenuNotifications;
