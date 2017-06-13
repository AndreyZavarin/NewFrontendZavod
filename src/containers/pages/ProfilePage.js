import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {fetchInfoIfNeeded} from '../../actions'
import VMasker from '../../scripts/vanilla-masker.min'
import WaitingForData from '../../components/WaitingForData'
import Address from '../../components/Address'

class ProfilePage extends Component {

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(fetchInfoIfNeeded())
  }

  render() {
    const { isFetching, hasData, client } = this.props
    if (isFetching || !hasData) {
      return <WaitingForData />
    }

    const { lastName, firstName, secondName, address, actualAddress, phones, passport } = client

    return (
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="profile-l">
            <div className="portrait-photo">
              <img src="../../img/dummy_photo.jpg" alt=""/>
            </div>
          </div>
          <div className="profile-r">
            <div className="row">
              <div className="col-xs-12">
                <table className="user-data">
                  <tbody>
                    <tr>
                      <td><span>ФИО:</span></td>
                      <td><span>{lastName} {firstName} {secondName}</span></td>
                    </tr>
                    <tr>
                      <td colSpan="2">&nbsp;</td>
                    </tr>
                    <tr>
                      <td><span>Адрес регистрации:</span></td>
                      <td><Address address={address}/></td>
                    </tr>
                    { actualAddress &&
                      <tr>
                        <td><span>Адрес проживания:</span></td>
                        <td><Address address={actualAddress}/></td>
                      </tr>
                    }
                    <tr>
                      <td colSpan="2">&nbsp;</td>
                    </tr>
                    <tr>
                      <td><span>Телефон:</span></td>
                      <td>
                        {phones.map((i, index) => {
                          return <p key={index}><span>{VMasker.toPattern(i.number, '+7 (999) 999 99 99')}</span></p>
                        })}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" style={{lineHeight: 2}}>&nbsp;</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td><span className="font-bold">Паспортные данные</span></td>
                    </tr>
                    <tr>
                      <td colSpan="2" style={{lineHeight: 0.6}}>&nbsp;</td>
                    </tr>
                    <tr>
                      <td><span>Серия и номер:</span></td>
                      <td><span>{VMasker.toPattern(passport.number, '99 99 999999')}</span></td>
                    </tr>
                    <tr>
                      <td colSpan="2">&nbsp;</td>
                    </tr>
                    <tr>
                      <td><span>Кем выдан:</span></td>
                      <td><span>{passport.issuedBy}</span></td>
                    </tr>
                    <tr>
                      <td colSpan="2">&nbsp;</td>
                    </tr>
                    <tr>
                      <td><span>Дата выдачи:</span></td>
                      <td><span>{moment(passport.issuedDate).format('DD.MM.YYYY')}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProfilePage.propTypes = {
  dispatch: PropTypes.func,
  isFetching: PropTypes.bool.isRequired,
  hasData: PropTypes.bool.isRequired,
  client: PropTypes.object,
}


const mapStateToProps = (state) => {
  const info = state.info
  return {
    isFetching: info.isFetching,
    hasData: info.has,
    client: info.client,
  }
}

export default connect(
  mapStateToProps
)(ProfilePage)

