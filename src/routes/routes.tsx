/** @format */
import { Fragment } from 'react';
import Login from '../components/auth/login';
import { getState } from '../features/cotizacion/slice';
import { useAppSelector } from '../app/hooks';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavBar } from '../components/navbar/navBar';
import Cotizacion from '../views/Cotizacion';
const SinglePages = () => (
	<Routes>
		<Route path='/' element={<div>Home</div>} />
		<Route path='/login' element={<Login />} />
		<Route path='*' element={<Navigate to='/login' />} />
	</Routes>
);
const ProtectedPages = () => (
	<Fragment>
		<NavBar />
		<Routes>
			<Route path='/Home' element={<div>Home</div>} />
			<Route path='/Cotizacion' element={<Cotizacion />} />
			<Route path='*' element={<Navigate to='/Home' />} />
		</Routes>
	</Fragment>
);
export default function RenderRoutes() {
	const { publicId } = useAppSelector(getState).auth;
	console.log(useAppSelector(getState));
	return publicId ? <ProtectedPages /> : <SinglePages />;
}
