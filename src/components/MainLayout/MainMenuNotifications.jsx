import MenuNotificationIcon from '../../assets/images/menu_notification_icon.svg'
import NotificationIcon from '../../assets/images/notification_icon.svg'
import ArrowContextUserMenuIcon from '../../assets/images/arrow_context_user_menu_icon.svg'
import Profile from '../../assets/images/profile.png'

const MainMenuNotifications = ({active_notification}) => {
    return (
        <nav className="main_menu_notifications_content">
            <div className="content_icon_menu">
                <img src={MenuNotificationIcon} alt="" srcset="" />
            </div>

            <div className="user_notification_content">
                <span className="notification_icon">
                    <div className={`notificantion_simbol ${active_notification}`}></div>
                    <img src={NotificationIcon} alt="" srcset="" />
                </span>
                <div className="user_menu">
                    <img src={Profile} alt="" srcset="" />

                    <div className="component_description_icon_menu">
                        <div className="name_description">
                            <span>Daybison Braga</span>
                            <p>Desenvolvedor Senior</p>
                        </div>
                        <img src={ArrowContextUserMenuIcon} alt="" className="arrow_down_context_menu_user" />
                    </div>

                </div>
            </div>

        </nav>
    )

}

export default MainMenuNotifications;