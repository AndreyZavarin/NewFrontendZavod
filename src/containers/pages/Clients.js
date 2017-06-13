import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import {getClientList} from '../../actions'
import moment from 'moment'
import {fetchInfoIfNeeded} from '../../actions'
import VMasker from '../../scripts/vanilla-masker.min'
import WaitingForData from '../../components/WaitingForData'
import Address from '../../components/Address'

const visitStatus = {
    IDLE: 'Действующий',
    IN_PROGRESS: 'Ожидающий',
    EXPIRED: 'Истекающий',
    WARNING: 'Внимание',
    OVERDUE: 'Просрочен',
    PAUSED: 'Заморожен'
}
class Clients extends Component {

    componentDidMount() {
        this.props.dispatch(getClientList())
    }

    render() {
      //TODO Сделать когда идет загрузка
        // if (isFetching || !hasData) {
        //     return <WaitingForData />
        // }

        // const {allClientsList} = this.props.clients
        // let clients = [];
        // if(allClientsList) {
        //     for (let i = 0; i < allClientsList.length; i++) {
        //         const clientRow = <tr key={allClientsList[i].id}>
        //             <td>
        //                 <ActionAboveClient
        //                     updateActivePage = {this.props.updateActivePage}
        //                 />
        //             </td>
        //             <td><input type="checkbox"/></td>
        //             <td><a href="#" onClick={this.props.getSingleClient.bind(this, allClientsList[i].id)}>{allClientsList[i].lastName} {allClientsList[i].firstName} {allClientsList[i].middleName}</a></td>
        //             <td>{testMas[i][0]}</td>
        //             <td>{testMas[i][1]}</td>
        //             <td>{testMas[i][2]}</td>
        //             <td>{testMas[i][3]}</td>
        //             <td><StatusAbonements status={testMas[i][4]}/></td>
        //         </tr>
        //         clients.push(clientRow);
        //     }
        // }

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
                    {/*{allClientsList?clients:''}*/}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}

Clients.propTypes = {
    dispatch: PropTypes.func,
    isFetching: PropTypes.bool.isRequired,
    // hasData: PropTypes.bool.isRequired,
    // client: PropTypes.object,
}

const mapStateToProps = (state) => {
    const clients = state.clients
    // const info = state.info
    return {
        // isFetching: info.isFetching,
        // hasData: info.has,
        // client: info.client,
    }
}

export default connect(
    mapStateToProps
)(Clients)

