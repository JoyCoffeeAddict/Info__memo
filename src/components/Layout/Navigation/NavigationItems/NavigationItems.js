import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
const NavigationItems = ({logoutFunc, isAuth, isMenuClosed}) => {
	return (
		<>
			{/* This is logo, and 'home' button */}

			{isAuth ? (
				<>
					<NavigationItem isClosed={isMenuClosed} link="/profile">
						Profile
					</NavigationItem>
					<NavigationItem isClosed={isMenuClosed} link="/" clicked={logoutFunc}>
						Logout
					</NavigationItem>
				</>
			) : (
				<>
					<NavigationItem isClosed={isMenuClosed} link="/register">
						Register
					</NavigationItem>
					<NavigationItem isClosed={isMenuClosed} link="/log-in">
						Log in
					</NavigationItem>
				</>
			)}
			<NavigationItem isClosed={isMenuClosed} link="/study">
				Study
			</NavigationItem>
		</>
	);
};

export default NavigationItems;
