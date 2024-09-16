import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./auth-button.style.scss";
import { NavLink } from "react-router-dom";

const AuthButton = () => {
    return (
        <NavLink to="/login" className="auth-button">
            <FontAwesomeIcon icon={faRightToBracket} />
        </NavLink>
    )
}

export default AuthButton;