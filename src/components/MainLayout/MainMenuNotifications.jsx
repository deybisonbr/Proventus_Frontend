import React, { useState, useEffect, useRef } from 'react'; // Importando useState e useEffect
import { motion, AnimatePresence } from 'framer-motion';
import MenuNotificationIcon from '../../assets/images/menu_notification_icon.svg';
import NotificationIcon from '../../assets/images/notification_icon.svg';
import ArrowContextUserMenuIcon from '../../assets/images/arrow_context_user_menu_icon.svg';
import NotificationInfoIcon from '../../assets/images/notification/info_icon.svg';
import Profile from '../../assets/images/profile.png';

const MainMenuNotifications = ({
    active_notification,
    menuOpen,
    notificationOpen,
    notifications,
    hasUnread,
    userData,
    handleNotificationClick,
    menuRef,
    notificationRef,
    setMenuOpen
}) => {
    const [selectedNotification, setSelectedNotification] = useState(null);
    const popupRef = useRef(null); 

    // Função que abre o popup com a notificação
    const handleNotificationClickOpen = (notif) => {
        setSelectedNotification(notif); 
        handleNotificationClick(); 
    };

    // Fechar popup
    const handleClosePopup = () => {
        setSelectedNotification(null); 
    };

    // Fechar o popup ao clicar fora dele
    const handleClickOutsidePopup = (event) => {
       
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            handleClosePopup();
        }
    };


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsidePopup);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsidePopup); 
        };

    }, []);

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
                                            <a className='notification_redirect_link' href="#" onClick={() => handleNotificationClickOpen(notif)}>
                                                <span className={`notification_user_read ${notif.read ? "true" : ""}`}></span>
                                                <p>{notif.title}</p>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {selectedNotification && (
                        <motion.div
                            ref={popupRef} // Referência do popup
                            className="notification_popup"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="notification_popup_content">
                                <div className="popup_header">
                                    <div className="title_close_button_content">
                                        <img src={NotificationInfoIcon} alt="" srcSet="" />

                                        <div className="title_type_box">
                                            <h3>{selectedNotification.title}</h3>
                                            <p>{selectedNotification.type}</p>
                                        </div>
                                    </div>
                                    
                                    <button onClick={handleClosePopup} className="close_button">X</button>
                                </div>



                                <p className='description_notification'><strong>Descrição:</strong> {selectedNotification.description}</p>

                            </div>
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
