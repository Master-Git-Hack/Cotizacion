import React,{Component} from 'react';
import Formulario from './Formulario'
import logo from './../logo.png';
import mak from './../mak.png';
class Reporte extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            vista:false,
            fecha_actual:this.props.fecha,
            vigencia:'',
            subtotal:0.00,
            total:0.00,
            iva:0.00,
            cotizacion:[this.props.cotizacion]
        }
    }
    componentDidMount()
    {
        let fecha = new Date(this.props.fecha);
        fecha.setDate(fecha.getDate() + 8)
        const vigencia = fecha.getFullYear() +'-'+(fecha.getMonth()+1)+'-'+fecha.getDate();
        var subtotal=0.00;
        Object.keys(this.props.cotizacion).forEach(key => 
           subtotal=Number(parseFloat(subtotal).toFixed(2))  + parseFloat(this.props.cotizacion[key].precioTotal.toFixed(2))
            )
        var iva = parseFloat(subtotal*0.16).toFixed(2);
        var total = Number(parseFloat(subtotal)+parseFloat(iva)).toFixed(2);
        this.setState({vigencia,subtotal:subtotal.toFixed(2),iva,total});
    }
    render()
    {
        return(
            this.state.vista ? <Formulario/> :
            <div className="container">
                <div className="text-right"><button type="submit" onClick={()=>this.state.vista ? this.setState({vista:false}) : this.setState({vista:true})} className="btn btn-link">[x]</button></div>
                <div className="center jumbotron bg-light">
                    <div className="row">
                        <div className="col-3">
                            <img srcSet={logo} width="220px" className="rounded float-left" alt="SP&P" />
                        </div>
                        <div className="col-6 text-center">
                            <h2>Jorge Porras Sánchez</h2>
                            <br/>
                            <p>3 LOTE 17 S/N NUEVO JURIQUILLA, QUERÉTARO, QRO.</p>
                            <p>TEL.: 4424045269 CEL.:4422702475</p>
                            <p> CORREO ELCTRÓNICO: <a href="#">porrassj36@hotmail.com</a></p>
                        </div>
                        <div className="col-3">
                            <img srcSet={mak} width="220px" className="rounded float-right" alt="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 text-center">
                            <strong>
                                SP&P
                            </strong>
                        </div>
                        <div className="col-6">
                            <p>Especialistas en Soldadura, Electricidad, Plomería, Estructuras, Pailería y Mantenimiento en General.</p>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-3">
                            <strong>
                                Cliente: 
                            </strong>
                        </div>
                        <div className="col-6">{this.props.cliente}</div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-2">
                            <strong>
                                At´n: 
                            </strong>
                        </div>
                        <div className="col-6">{this.props.atiende}</div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-2"><strong>Cotizó: </strong></div>
                        <div className="col-4">Tec. Arq. Juan Jesús Porras Gutiérrez</div>
                        <div className="col-2"><strong>Fecha: </strong></div>
                        <div className="col-4">{this.props.fecha}</div>
                    </div>
                    <br/>
                    <h2 className="text-primary text-center">
                        <a onClick={()=>window.print()} href="#">
                            Cotización
                        </a>
                    </h2>
                    <br/>
                    <div className="card">
                        <div className="card-header bg-info">
                            <div className="table">
                                <div className="row text-light text-center">
                                    <div className="col-2">
                                        <h5 className="card-title">Cantidad</h5>
                                    </div>
                                    <div className="col-6">
                                        <h5 className="card-title">Concepto</h5>
                                    </div>
                                    <div className="col-2">
                                        <h5 className="card-title">Precio Unitario</h5>
                                    </div>
                                    <div className="col-2">
                                        <h5 className="card-title">Importe</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            {this.props.cotizacion.map((key,i) =>{
                                return(
                                    <div className="row text-center">
                                        <div className="col-2">
                                            <p className="card-text">{this.props.cotizacion[i].cantidad}</p>
                                        </div>
                                        <div className="col-6 text-left">
                                            <p className="card-text">{this.props.cotizacion[i].concepto}</p>
                                        </div>
                                        <div className="col-2">
                                            <p className="card-text">$ {Number(this.props.cotizacion[i].precio).toFixed(2)}</p>
                                        </div>
                                        <div className="col-2">
                                            <p className="card-title">$ {Number(this.props.cotizacion[i].precioTotal).toFixed(2)}</p>
                                        </div>
                                    </div>
                                );
                            })
                            }   
                        </div>
                        <div className="card-footer">
                            <div className="row text-center">
                                <div className="col-8"></div>
                                <div className="col-2">
                                    <p className="card-text"><strong>SubTotal: </strong></p>
                                </div>
                                <div className="col-2">
                                    <p className="card-title">$ {this.state.subtotal} </p>
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="col-8"></div>
                                <div className="col-2">
                                    <p className="card-text"><strong>IVA: </strong></p>
                                </div>
                                <div className="col-2">
                                    <p className="card-title">$ {this.state.iva} </p>
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="col-8"></div>
                                <div className="col-2">
                                    <p className="card-text"><strong>Total: </strong></p>
                                </div>
                                <div className="col-2">
                                    <p className="card-title">$ {this.state.total}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <ul className="list-group">
                        <li className="list-group-item">Vigencia de la cotización: {this.state.vigencia}</li>
                        <li className="list-group-item">Precios en moneda nacional.</li>
                        <li className="list-group-item">Precio más 16% IVA.</li>
                        <li className="list-group-item"><strong>Estimado Cliente:</strong> una vez confirmado su pedido por escrito, no se aceptaran cancelaciones, ni devoluciones.</li>
                        <li className="list-group-item">Para todo trabajo se requiere el <strong>60%</strong> de anticipo.</li>  
                    </ul>
                </div>
            </div>
        );
    }
}
export default Reporte;