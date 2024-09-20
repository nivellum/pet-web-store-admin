import AuthButton from '../auth-button/auth-button.component';
import NavigationLink from '../navigation-link/navigation-link.component';
import './navigation.style.scss';
import { faBasketShopping, faCube, faHouse, faIdCardClip, faTableList, faUserGroup } from '@fortawesome/free-solid-svg-icons';
const Navigation = () => {

    return (
        <nav className="navigation">
            <div className="navigation__title">
                Webstore
            </div>
            <div className="navigation__buttons">
                <NavigationLink isRoot={true} to="/" icon={faHouse} />
                <NavigationLink title="Base Categories" to="/base-categories" icon={faTableList} />
                <NavigationLink title="Categories" to="/categories" icon={faTableList} />
                <NavigationLink title="Products" to="/products" icon={faCube} />
                <NavigationLink title="Orders" to="/orders" icon={faBasketShopping} />
                <NavigationLink title="Clients" to="/clients" icon={faUserGroup} />
                <NavigationLink title="Users" to="/users" icon={faIdCardClip} />
            </div>
            <div className="navigation__auth">
                <AuthButton />
            </div>
        </nav>
    );
}

export default Navigation;