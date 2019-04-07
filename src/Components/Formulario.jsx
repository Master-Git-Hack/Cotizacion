import React, {Component} from 'react';
import update from 'react-addons-update';
import Reporte from './Reporte';
import logo from './../logo.png';

class Formulario extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            id:0,
            cliente:'',
            atiende:'',
            fecha:'',
            cantidad:0,
            concepto:'',
            precio:0,
            cotizacion:[],
            mostrar:false
        }
        this.handleChange=this.handleChange.bind(this);
        this.agregarElemento=this.agregarElemento.bind(this);
    }
    handleChange(e)
    {
        this.setState({[e.target.name]:e.target.value});
    }
    agregarElemento()
    {
        if(window.confirm("¿La información es correcta?"))
        {
            this.setState({id:this.state.id+1});
            const {id,cantidad,concepto,precio} = this.state;
            const precioTotal=Number(this.state.cantidad*this.state.precio);
            const registro ={id,cantidad,concepto,precio,precioTotal}
            const newRegistro = update(this.state.cotizacion,{$push:[registro]});
            this.setState({cotizacion:newRegistro})
        }
    }

    render()
    {
        return(
            this.state.mostrar ? window.confirm("¿Deseas ver la hoja?") ?
                <Reporte 
                    cotizacion={this.state.cotizacion}
                    cliente={this.state.cliente}
                    atiende={this.state.atiende}
                    fecha={this.state.fecha}
                    >
                </Reporte>
                    : <Formulario/>
                    :
            <div className="container text-center">
                <div className="center jumbotron">
                    <img className="rounded float-center img-responsive" alt="" srcset={logo}/>
                    <h2><strong>SP&P</strong></h2>
                    <div className="row">
                        <div className="col-1 text-right">
                            <p className="text-primary">Cliente: </p>
                        </div>
                        <div className="col-11">
                            <input type="text" onChange={this.handleChange} className="form-control" name="cliente" />
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-1 text-right">
                            <p className="text-primary">Atiención: </p>
                        </div>
                        <div className="col-5">
                            <input type="text" onChange={this.handleChange} className="form-control" name="atiende" />
                        </div>
                        <div className="col-1">
                            <p className="text-primary">Fecha: </p>
                        </div>
                        <div className="col-5">
                            <input type="date" onChange={this.handleChange}  className="form-control" name="fecha" />
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-1 text-right">
                            <p className="text-primary">Cantidad: </p>
                        </div>
                        <div className="col-2">
                            <input type="number" onChange={this.handleChange} className="form-control" name="cantidad" />
                        </div>
                        <div className="col-1">
                            <p className="text-primary">Concepto: </p>
                        </div>
                        <div className="col-5">
                            <input type="text" onChange={this.handleChange} className="form-control" name="concepto" />
                        </div>
                        <div className="col-1">
                            <p className="text-primary">Precio: </p>
                        </div>
                        <div className="col-2">
                            <input type="number" onChange={this.handleChange} className="form-control" name="precio" />
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-6 text-left">
                            <button type="submit"onClick={()=>this.state.mostrar ? this.setState({mostrar:false}): this.setState({mostrar:true})} className="btn btn-light">Mostrar</button>
                        </div>
                       <div className="col-6 text-right"> 
                            <button type="submit"onClick={this.agregarElemento} className="btn btn-primary">Agregar</button>
                        </div>
                    </div>
                </div>
                <ul className="list-group text-center">
                    <li className="list-group-item bg-dark text-light">
                        <div className="row">
                            <div className="col-1">Cantidad </div>|
                            <div className="col-6">Concepto</div>|
                            <div className="col-2">Precio</div>|
                            <div className="col-2"> Total</div>
                        </div>
                    </li>
                    {this.state.cotizacion.map((valor,i)=>{
                        return(
                            <li className="list-group-item" key={i}>
                                <div className="row">
                                    <div className="col-1">{this.state.cotizacion[i].cantidad}</div>|
                                    <div className="col-6">{this.state.cotizacion[i].concepto}</div>|
                                    <div className="col-2">{this.state.cotizacion[i].precio}</div>|
                                    <div className="col-2">{this.state.cotizacion[i].precioTotal}</div>
                                </div> 
                            </li>
                        );
                    })}
                </ul>
                    
            </div>

        );
    }
}
export default Formulario;