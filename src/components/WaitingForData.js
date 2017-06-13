import React from 'react'
import ProfileMessage from './ProfileMessage'

const WaitingForData = () => {
  return (
    <ProfileMessage>
      <span className="subhead font-bold">Подождите немного, мы ищем Вас</span>
      <br/>
      <br/>
      <span>
        Случиться может всё, что угодно.<br/>
        И если что,<span className="yellow"> мы вас выручим. </span>
      </span>
    </ProfileMessage>
  )
}

export default WaitingForData