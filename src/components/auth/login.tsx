/** @format */
import { useState } from 'react';
import Logo from '../../assets/images/logo.png';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getState, setAuth } from '../../features/cotizacion/slice';
import { consume } from '../../api/api.config';
import { Navigate } from 'react-router-dom';

export default function Login() {
	const dispatch = useAppDispatch();
	const { auth } = useAppSelector(getState);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPwd, setShowPwd] = useState(false);
	const sendRequest = async (e: any) => {
		e.preventDefault();
		if (email !== '' && password !== '') {
			const formData = new FormData();
			formData.append('email', email);
			formData.append('password', password);
			const url = 'auth/login';
			try {
				const response = await consume('', 'json').post(url, formData);
				const { name, token } = response.data;
				if (response.status === 201) {
					dispatch(setAuth({ name, token }));
				} else window.alert(`Algo fallo favor de intentar más tarde, ${response.data}`);
			} catch (error) {
				alert(error);
			}
		} else window.alert(`Debe llenar los campos correctamente para continuar`);
	};
	return !auth.publicId ? (
		<div className='container container-fluid px-5 mx-auto'>
			<div className='card px-5 mt-3'>
				<form className='card-body px-5 text-center'>
					<div className='row px-5'>
						<div className='col-12'>
							<img src={Logo} alt='SPP' />
							<h3>SPP</h3>
						</div>
					</div>
					<div className='row mt-4 px-5'>
						<div className='col'>
							<div className='form-floating'>
								<input
									type='email'
									className='form-control'
									placeholder='test'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									autoComplete='on'
									required
								/>
								<label>Correo Electrónico</label>
							</div>
						</div>
					</div>
					<div className='row mt-4 px-5'>
						<div className='col'>
							<div className='form-floating'>
								<input
									type={showPwd ? 'text' : 'password'}
									className='form-control'
									placeholder='Password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								<label>Password</label>
							</div>
						</div>
					</div>
					<div className='row px-5'>
						<div className='col text-start'>
							<button
								className='btn btn-sm btn-link text-secondary'
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									setShowPwd(!showPwd);
								}}
							>
								{showPwd ? 'Ocultar Contraseña' : 'Mostrar Contraseña'}
							</button>
						</div>
					</div>
					<div className='row mt-3'>
						<div className='col text-end'>
							<button
								className='btn btn-sm btn-outline-success'
								type='submit'
								onClick={(e) => sendRequest(e)}
							>
								Inciar Sesión
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	) : (
		<Navigate to='/Home' />
	);
}
