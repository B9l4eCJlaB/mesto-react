import logo from '../images/logo.png'
function Header() {
    return (
    <header className="header">
        <img className="header__logo logo" src={logo}  alt="Логотип" />
    </header>
    )
}

export default Header;