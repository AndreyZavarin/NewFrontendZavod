import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import {getClientList} from '../../actions'
import moment from 'moment'
import {fetchInfoIfNeeded} from '../../actions'
import VMasker from '../../scripts/vanilla-masker.min'
import WaitingForData from '../../components/WaitingForData'
import Address from '../../components/Address'

const StatusAbonements = ({status}) => {
    console.log(status)

    const visitStatus = {
        IDLE:{
            text: 'Действующий',
            style: 'label label-success'
        },
        IN_PROGRESS: {
            text: 'Ожидающий',
            style: 'label label-primary'
        },
        EXPIRED: {
            text: 'Истекающий',
            style: 'label label-warning',
        },
        WARNING: {
            text: 'Внимание',
            style: 'label label-important'
        },
        OVERDUE: {
            text: 'Просрочен',
            style: 'label label-danger'
        },
        PAUSED: {
            text: 'Заморожен',
            style: 'label label-info'
        }
    }
    return <h4><span style={{width: '110px', display: 'block'}} className={visitStatus[status].style}>{visitStatus[status].text}</span></h4>
}

const ActionAboveClient = ({}) => {
    return <div className="btn-group">
        <button type="button" className=" btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown"><span className="caret"></span></button>
        <ul className="dropdown-menu" role="menu">
            <li><a href="#">Посещение</a></li>
            <li><a href="#">Заверщение</a></li>
            <li><a href="#">Покупка товара</a></li>
            <li><a href="#">Покупка абонемента</a></li>
            <li><a href="#">Продление абонемента</a></li>
            <li><a href="#">Заморозить</a></li>
            <li className="divider"></li>
            <li><a href="#">Открыть</a></li>
            <li><a href="#">Редактировать</a></li>
        </ul>
    </div>
}


class Clients extends Component {

    componentDidMount() {
        this.props.dispatch(getClientList())
    }

    render() {

        const {clientsList} = this.props.clients
        let clients = [];
        if(clientsList) {
            for (let i = 0; i < clientsList.length; i++) {
                const clientRow = <tr key={clientsList[i].id}>
                    <td>
                        <ActionAboveClient
                            updateActivePage = {this.props.updateActivePage}
                        />
                    </td>
                    <td><input type="checkbox"/></td>
                    <td><a href="#">{clientsList[i].lastName} {clientsList[i].firstName} {clientsList[i].middleName}</a></td>
                    <td>{clientsList[i].phoneNumber}</td>
                    <td>{clientsList[i].email}</td>
                    <td>{clientsList[i].visitStatus}</td>
                    <td>{clientsList[i].numberSubscription[clientsList[i].numberSubscription.length - 1]}</td>
                    <td><StatusAbonements status={clientsList[i].subState[clientsList[i].subState.length - 1]}/></td>
                </tr>
                clients.push(clientRow);
            }
        }

        return (
            <div>
            <div className="clearfix" style={{background: '#ffffff'}}>
                <form className="navbar-form navbar-left" role="search">
                    <div className="input-group">
                        <input type="text" className="form-control" />
                        <span className="input-group-btn">
                        <button className="btn btn-default" type="button">Найти</button>
                      </span>
                    </div>
                    <button style={{marginLeft: '10px'}} type="button" className="btn btn-success"><span className="glyphicon glyphicon-plus"></span> Добавить клиента</button>

                </form>
            </div>
            <div className="col-sm-12" style={{marginTop: '10px'}}>
                <table className="table table-hover" style={{background: '#ffffff'}}>
                    <thead>
                    <tr>
                        <th></th>
                        <th><input type="checkbox"/></th>
                        <th>ФИО</th>
                        <th>ТЕЛЕФОН</th>
                        <th>EMAIL</th>
                        <th>СТАТУС</th>
                        <th>№ АБОНЕМЕНТА</th>
                        <th>СТАТУС АБОНЕМЕНТА</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clientsList?clients:''}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}

Clients.propTypes = {
    dispatch: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        clients: state.clients
    }
}

export default connect(
    mapStateToProps
)(Clients)
