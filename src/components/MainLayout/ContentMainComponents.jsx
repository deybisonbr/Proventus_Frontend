import './ContentMainComponents.css'
import MainMenuLeft from './MainMenuLeft';
import MainMenuNotifications from './MainMenuNotifications';

const  ContentMainComponents = ({children}) => {
return (
    <div className="contains_main_components">
        { <MainMenuNotifications active_notification="active"/> /*disabled or active */}
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