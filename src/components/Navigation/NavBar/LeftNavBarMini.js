import React, {PropTypes, Component } from 'react'
import { Link } from 'react-router'
//import ReactDOM from 'react-dom';


export default class LeftNavBarMini extends Component {

    componentDidMount(){
    }

    render() {
        return <nav className="navbar navbar-inverse visible-xs">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">ZAVOD</a>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav">
                        <li><Link activeClassName="active" to="/clients"><span className="glyphicon glyphicon-user"></span> Клиенты</Link></li>
                        <li><Link activeClassName="active" to="/clients"><span className="glyphicon glyphicon-tasks"></span> Товары</Link></li>
                        <li><Link activeClassName="active" to="/clients"><span className="glyphicon glyphicon-list-alt"></span> Абонементы</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    }
}

LeftNavBarMini.propTypes = {

}
