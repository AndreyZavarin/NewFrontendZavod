import React from 'react'

const NoLoans = (_, {helpPhone}) => (
  <div className="row no-block" style={{height: '253px'}}>
    <div className="col-xs-12">
      <p><span className="subhead font-bold">У вас нет открытых займов!</span></p>
      <p>Подайте заявку и получите займ уже сегодня!</p>
      <p>Служба поддержки:<br/>{helpPhone}<br/><span
        className="grey-text">бесплатные звонки по всей России</span></p>
    </div>
  </div>
)

NoLoans.contextTypes = {
  helpPhone: React.PropTypes.string,
}

export default NoLoans
