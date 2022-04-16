/** @format */

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getState, setTax, setCustomer } from '../../features/cotizacion/slice';
import moment from 'moment';
export const Customer = () => {
	const { customer, result } = useAppSelector(getState);
	const { hasTax } = result.tax;
	const { company, name, email, date } = customer;
	const dispatch = useAppDispatch();
	return (
		<div className='card my-5 text-center'>
			<div className='card-header'>
				<h3>Información del Cliente</h3>
			</div>
			<div className='card-body'>
				<div className='row'>
					<div className='col-6'>
						<label className='form-label' htmlFor='Company'>
							Cliente:
						</label>
						<input
							type='text'
							id='Company'
							className='form-control form-control-sm'
							value={company}
							onChange={(e) => dispatch(setCustomer({ key: 'company', value: e.target.value }))}
						/>
					</div>
					<div className='col-6'>
						<label className='form-label' htmlFor='Email'>
							Email:
						</label>
						<input
							type='email'
							id='Email'
							className='form-control form-control-sm'
							value={email}
							onChange={(e) =>
								dispatch(
									setCustomer({
										key: 'email',
										value: e.target.value,
									})
								)
							}
						/>
					</div>
				</div>
				<div className='row'>
					<div className='col-6'>
						<label className='form-label' htmlFor='Customer'>
							At'n:
						</label>
						<input
							type='text'
							id='Customer'
							className='form-control form-control-sm'
							value={name}
							onChange={(e) => dispatch(setCustomer({ key: 'name', value: e.target.value }))}
						/>
					</div>
					<div className='col-6'>
						<label className='form-label' htmlFor='Fecha'>
							Fecha:
						</label>
						<input
							type='date'
							id='Fecha'
							className='form-control form-control-sm'
							value={date}
							onChange={(e) => {
								dispatch(
									setCustomer({
										key: 'date',
										value: moment(e.target.value).format('YYYY-MM-DD'),
									})
								);
								dispatch(
									setCustomer({
										key: 'effectiveness',
										value: moment(e.target.value).add({ days: 7 }).format('YYYY-MM-DD'),
									})
								);
							}}
						/>
					</div>
				</div>
				<div className='row mt-3'>
					<div className='col-12 text-start'>
						<strong>Cotizó:</strong> Arq. Juan Jesús Porras Gutiérrez
					</div>
				</div>
			</div>
			<div className='card-footer text-start'>
				<div className='form-check form-switch '>
					<input
						className='form-check-input'
						type='checkbox'
						checked={hasTax}
						role='switch'
						id='flexSwitchCheckDefault'
						onChange={() => dispatch(setTax())}
					/>
					<label className='form-check-label ' htmlFor='flexSwitchCheckDefault'>
						Calcular IVA
					</label>
				</div>
			</div>
		</div>
	);
};
