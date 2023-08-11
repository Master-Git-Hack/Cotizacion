/** @format */

import { Table } from '../components/cotizacion/table';
import { Customer } from '../components/cotizacion/customer';
import { Save } from '../components/cotizacion/save';
export default function Cotizacion() {
	return (
		<div className='container container-fluid'>
			<Customer />

			<Table />

			<Save />
		</div>
	);
}
