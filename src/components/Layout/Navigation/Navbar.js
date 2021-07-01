import styless from './Navbar.module.scss';
import React, {useState} from 'react';
import NavigationItems from './NavigationItems/NavigationItems';
import {NavLink} from 'react-router-dom';
const Navbar = ({isAuth}) => {
	const [isMenuClosed, setIsMenuClosed] = useState(true);
	return (
		<>
			<header className={styless.navbar}>
				<div className={styless.container}>
					{/* LOGO/ BRAND NAME */}
					<NavLink to="/">
						<div>Info.memo()</div>
					</NavLink>
					<div className={styless.menuWrapper}>
						<button onClick={() => setIsMenuClosed(prevState => !prevState)} className={styless.menuButton}>
							<div className={styless.menuBar}>Menu</div>
						</button>
						<nav className={styless.navigationWrapper}>
							<ul className={styless.menuList}>
								<NavigationItems isMenuClosed={isMenuClosed} logoutFunc={() => {}} isAuth={false} />
							</ul>
						</nav>
					</div>
				</div>
			</header>
		</>
	);
};

export default Navbar;
