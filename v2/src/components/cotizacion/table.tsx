/** @format */

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getState, setData, addDataRow, removeDataRow } from '../../features/cotizacion/slice';
import { Navigate } from 'react-router-dom';
import { FancyInput } from '../inputs/fancyInput';
import { toFancyNumber } from '../../utils/utils';
export const Table = () => {
	const dispatch = useAppDispatch();
	const { data, auth, result } = useAppSelector(getState);
	const { tax, subTotal, total } = result;
	return auth.publicId ? (
		<>
			<div className='row mb-3'>
				<div className='col-6 text-start'>
					<button className='btn btn-sm btn-primary' onClick={() => dispatch(addDataRow())}>
						Agregar Fila
					</button>
				</div>
				{data.length > 1 ? (
					<div className='col-6 text-end'>
						<button
							className='btn btn-sm btn-outline-danger'
							onClick={() => dispatch(removeDataRow())}
						>
							Eliminar Ultima Fila
						</button>
					</div>
				) : null}
			</div>
			<table className='table table-sm table-responsive table-responsive-sm table-hover table-stripped'>
				<thead className='table-light align-self-middle align-middle text-center'>
					<tr className='row'>
						<th className='col-1'>Cantidad</th>
						<th className='col-7'>Concepto</th>
						<th className='col-2'>Precio</th>
						<th className='col-2'>Total</th>
					</tr>
				</thead>
				<tbody className='table-light align-self-middle align-middle text-center'>
					{data.map((item: any, index: number) => (
						<tr key={`row for prizing concepts ${index}`} className='row'>
							<td className='col-1'>
								<input
									type='number'
									className='form-control form-control-sm text-center'
									name='quantity'
									value={item.quantity}
									onChange={(e) =>
										dispatch(
											setData({
												index,
												key: 'quantity',
												value: Number(e.target.value),
											})
										)
									}
								/>
							</td>
							<td className='col-7'>
								<textarea
									rows={1}
									className='form-control form-control-sm'
									name='concept'
									value={item.concept}
									onChange={(e) =>
										dispatch(
											setData({
												index,
												key: 'concept',
												value: e.target.value,
											})
										)
									}
								/>
							</td>
							<td className='col-2'>
								<FancyInput
									index={index}
									name={`price-${index}`}
									value={item.price}
									isCurrency={true}
									onChange={(e) =>
										dispatch(
											setData({
												index,
												key: 'price',
												value: Number(e.target.value),
											})
										)
									}
									style={`text-center`}
								/>
							</td>
							<td className='col-2'>{toFancyNumber(item.total, true)}</td>
						</tr>
					))}
				</tbody>
				<tfoot className='table-light align-self-middle align-middle text-center'>
					{tax.hasTax ? (
						<>
							<tr className='row'>
								<td className='col-10 text-end'>Sub-Total:</td>
								<td className='col-2'>{toFancyNumber(subTotal, true)}</td>
							</tr>
							<tr className='row'>
								<td className='col-10 text-end'>IVA:</td>
								<td className='col-2'>{toFancyNumber(tax.value, true)}</td>
							</tr>
						</>
					) : null}
					<tr className='row'>
						<td className='col-10 text-end'>Total:</td>
						<td className='col-2'>{toFancyNumber(total, true)}</td>
					</tr>
				</tfoot>
			</table>
		</>
	) : (
		<Navigate to='/login' />
	);
};
