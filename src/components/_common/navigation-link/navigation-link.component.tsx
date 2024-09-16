import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './navigation-link.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, NavLinkRenderProps } from 'react-router-dom';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
type NavigationLinkProps = {
    to: string;
    icon: any;
    title?: string;
    extraClass?: string;
    isRoot?: boolean;
}



const NavigationLink = ({ to, icon, title, extraClass, isRoot }: NavigationLinkProps) => {

    return (
        <NavLink to={to}
            className={({ isActive, isTransitioning, isPending }) =>
                `navigation-link ${isRoot ? 'navigation-link_root' : ''} ${extraClass ?? ''} ${isActive ? 'navigation-link_active' : ''}${isTransitioning ? 'navigation-link_loading' : ''}`}
        >
            <FontAwesomeIcon className='navigation-link__logo' icon={icon} />
            {title && <span className='navigation-link__title'>{title}</span>}
        </NavLink>
    );
}

export default NavigationLink;