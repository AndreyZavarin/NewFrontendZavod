import React, {PropTypes} from 'react'

const ProfileMessage = ({children, messageElemId}) => {
  return (
    <div className="row">
      <div className="col-xs-12 gradient-back">
        <div className="text-center">
          <div className="row">
            <div className="col-xs-12">
              <p id={messageElemId}>
                {children}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ProfileMessage.propTypes = {
  children: PropTypes.any,
  messageElemId: PropTypes.string,
}


export default ProfileMessage