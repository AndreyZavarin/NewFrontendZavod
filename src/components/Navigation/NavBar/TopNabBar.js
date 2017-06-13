/**
 * Created by zawar on 03.05.2017.
 */
import React, {PropTypes, Component } from 'react'
//import ReactDOM from 'react-dom';


export default class TopNabBar extends Component {

    componentDidMount(){
    }

    render() {
        return <div className="clearfix col-sm-10" style={{background: "#ffffff"}}>

            <div className="col-sm-6 col-sm-offset-6" >
                <div className="btn-group pull-right"  style={{padding: "10px"}}>
                    <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown">Администратор <span className="caret"></span></button>
                    <ul className="dropdown-menu" role="menu">
                        <li><a href="#">Редактирование профиля</a></li>
                        <li className="divider"></li>
                        <li><a href="#">Выйти</a></li>
                    </ul>
                </div>

                <div className="btn-group pull-right" style={{marginRight: "20px", padding: "10px"}}>
                    <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown">Быстро добавить ... <span className="caret"></span></button>
                    <ul className="dropdown-menu" role="menu">
                        <li><a href="#">Клиента</a></li>
                        <li><a  href="#">Абонемент</a></li>
                    </ul>
                </div>

                <div className="btn-group pull-right" style={{marginRight: "20px", padding: "10px"}}>
                    <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown">Без регистрации ... <span className="caret"></span></button>
                    <ul className="dropdown-menu" role="menu">
                        <li><a href="#">Покупка товара</a></li>
                        <li><a href="#">Посещение</a></li>
                    </ul>
                </div>

            </div>
        </div>
    }
}

TopNabBar.propTypes = {

}