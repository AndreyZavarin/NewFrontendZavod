import React, {PropTypes, Component } from 'react'
import { Link } from 'react-router'

export default class LeftNavBar extends Component {

    componentDidMount(){
    }

    render() {
        // minWidth: '250px'
        return <div className="col-sm-2 sidenav hidden-xs" style={{background: "#333333"}}>
            <div className="img-responsive phone-disc"
                 style={{padding: '5px', height: '50px', fontFamily: 'Stencil', fontSize: '40px', textAlign: 'center', color: "#ffffff"}}>
                ZAVOD
            </div>

            <ul className="nav nav-pills nav-stacked left-nav-bar" style={{marginTop:'20px'}}>
                <li><Link activeClassName="active" to="/clients"><span className="glyphicon glyphicon-user"></span> Клиенты</Link></li>
                <li><Link activeClassName="active" to="/clients"><span className="glyphicon glyphicon-tasks"></span> Товары</Link></li>
                <li><Link activeClassName="active" to="/clients"><span className="glyphicon glyphicon-list-alt"></span> Абонементы</Link></li>

                {/*<li className="active"><a onClick={this.props.updateActivePage.bind(this, 'clients')} href="#clients"><span className="glyphicon glyphicon-user"></span> Клиенты</a></li>*/}
                {/*<li><a onClick={this.props.updateActivePage.bind(this, 'products')} href="#products"><span className="glyphicon glyphicon-tasks"></span> Товары</a></li>*/}
                {/*<li><a href="#section4"><span className="glyphicon glyphicon-list-alt"></span> Абонементы</a></li>*/}
            </ul>
                <br/>
        </div>
    }
}

LeftNavBar.propTypes = {

}