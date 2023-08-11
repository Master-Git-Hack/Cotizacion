/** @format */
import { consume } from '../../api/api.config';
import { useAppSelector } from '../../app/hooks';
import { getState } from '../../features/cotizacion/slice';
export const Save = () => {
	const { data, customer, result, auth } = useAppSelector(getState);
	const sendRequest = async (event: any) => {
		event.preventDefault();
		const url = '/quote';
		const payload = {
			data,
			customer,
			result,
		};
		try {
			const response = await consume(auth.publicId, 'json').post(url, payload);
			alert(response.data.message);
		} catch (error) {
			alert(error);
		}
	};
	return (
		<div className='row mt-5'>
			<div className='col-12 text-end'>
				<button className='btn btn-sm btn-success' onClick={(e) => sendRequest(e)}>
					Generar
				</button>
			</div>
		</div>
	);
};
