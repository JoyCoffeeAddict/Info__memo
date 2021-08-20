import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
const NavigationItems = ({logoutFunc, isAuth, isMenuClosed, clickLinkFunc}) => {
	return (
		<>
			{isAuth ? (
				<>
					<NavigationItem isClosed={isMenuClosed} link="/profile" clicked={clickLinkFunc}>
						Profile
					</NavigationItem>
					<NavigationItem
						isClosed={isMenuClosed}
						link="/"
						clicked={() => {
							logoutFunc();
							clickLinkFunc();
						}}>
						Logout
					</NavigationItem>
				</>
			) : (
				<>
					<NavigationItem isClosed={isMenuClosed} link="/register" clicked={clickLinkFunc}>
						Register
					</NavigationItem>
					<NavigationItem isClosed={isMenuClosed} link="/log-in" clicked={clickLinkFunc}>
						Log in
					</NavigationItem>
				</>
			)}
			<NavigationItem isClosed={isMenuClosed} link="/study" clicked={clickLinkFunc}>
				Study
			</NavigationItem>
		</>
	);
};

export default NavigationItems;
