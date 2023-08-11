/** @format */
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { getState, logOut } from '../../features/cotizacion/slice';
import Logo from '../../assets/images/logo.png';
export const NavBar = () => {
	const { name } = useAppSelector(getState).auth;
	const dispatch = useAppDispatch();

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light mb-4'>
			<div className='container-fluid'>
				<Link to='/Home' className='navbar-brand'>
					<img
						src={Logo}
						alt='SPP'
						width='40'
						height='40'
						className='d-inline-block align-text-middle'
					/>{' '}
					Servicios Profesionales Porras
				</Link>

				<div className='collapse navbar-collapse'>
					<div className='navbar-nav me-auto'>
						<Link to='/Cotizacion' className='nav-link'>
							Cotización
						</Link>
					</div>
					<div className='navbar-nav'>
						<span className='nav-link disabled'>{name}</span>
						<a className='nav-link text-danger' onClick={() => dispatch(logOut())} href='/login'>
							Log Out
						</a>
					</div>
				</div>
			</div>
		</nav>
	);
};
