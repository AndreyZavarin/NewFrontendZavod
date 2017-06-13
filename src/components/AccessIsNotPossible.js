import React from 'react'

const AccessIsNotPossible = () => {
  return (
    <div className="row">
      <div className="col-xs-12 gradient-back">
        <div className="text-center">
          <div className="row">
            <div className="col-xs-12">
              <p>
                <span className="subhead font-bold">Извините, доступ невозможен.</span>
                <br/>
                <br/>
                <span>Пожалуйста обратитесь<br/>
                  к
                  <span className="yellow">&nbsp;онлайн консультанту&nbsp;</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccessIsNotPossible