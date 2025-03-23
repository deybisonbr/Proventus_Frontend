import PaymentIcon from '../../assets/images/menu_icons/payment.svg';
import SearchProductsIcon from '../../assets/images/menu_icons/search_products.svg';
import RegisterProductsIcon from '../../assets/images/menu_icons/register_produts.svg';
import BalanceEntriesIcon from '../../assets/images/menu_icons/balance_entries.svg';
import BalanceWithdrawalIcon from '../../assets/images/menu_icons/balance_wihtdrawal.svg';
import DashboardIcon from '../../assets/images/menu_icons/dashboard.svg';
import DashboardSelectedIcon from '../../assets/images/menu_icons/dashboard_selected.svg';

import { useLocation } from 'react-router-dom';

const MainMenuLeft = () => {

    const location = useLocation(); // Obter a localização atual
    // Verificar se a rota é /dashboard
    const isDashboardActive = location.pathname === '/dashboard';

    return (
        <aside className="main_navigate_left">
            <ul className="items_menu">
                <li className="links_left_menu">
                    <a href="/dashboard">
                        <img 
                            src={isDashboardActive ? DashboardSelectedIcon : DashboardIcon} 
                            className="icon_menu_item" 
                            alt="Dashboard" 
                        />
                    </a>
                </li>
                <li className="links_left_menu">
                    <img src={PaymentIcon} className="icon_menu_item" alt="Payment" />
                </li>
                <li className="links_left_menu">
                    <img src={SearchProductsIcon} className="icon_menu_item" alt="Search Products" />
                </li>
                <li className="links_left_menu">
                    <img src={RegisterProductsIcon} className="icon_menu_item" alt="Register Products" />
                </li>
                <li className="links_left_menu">
                    <img src={BalanceEntriesIcon} className="icon_menu_item" alt="Balance Entries" />
                </li>
                <li className="links_left_menu">
                    <img src={BalanceWithdrawalIcon} className="icon_menu_item" alt="Balance Withdrawal" />
                </li>
            </ul>
        </aside>
    );
}

export default MainMenuLeft;
