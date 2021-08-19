import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import NavigationItems from './NavigationItems/NavigationItems';
import * as actions from '../../../store/actions/actions';
import styless from './Navbar.module.scss';
const Navbar = props => {
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
								<NavigationItems
									isMenuClosed={isMenuClosed}
									logoutFunc={props.onLogout}
									isAuth={props.isAuth}
									clickLinkFunc={() => setIsMenuClosed(prevState => !prevState)}
								/>
							</ul>
						</nav>
					</div>
				</div>
			</header>
		</>
	);
};

const mapStateToProps = state => {
	return {
		isAuth: state.auth.error === null && state.auth.token !== null,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(actions.logout()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
