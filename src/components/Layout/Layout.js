import React from 'react';
import './Layout.scss';
import Navbar from './Navigation/Navbar';
import Footer from './Footer/Footer';
const Layout = ({children}) => (
	<>
		<Navbar />
		{children}
		<Footer />
	</>
);

export default Layout;
