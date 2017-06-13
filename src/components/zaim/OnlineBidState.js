import React, {PropTypes} from 'react'

const OnlineBidState = ({bid}) => {
  const state = bid.state
  const unclaimed = bid.unclaimed
  if (state === 'Accepted') {
    return <span className="success">Онлайн заявка на займ - предварительно одобрена</span>
  }
  if (state === 'Started' || state === 'Created') {
    return <span>Онлайн заявка на займ - обрабатывается</span>
  }
  if (state === 'Rejected') {
    if (unclaimed) {
      return <span>Онлайн заявка на займ - не востребована</span>
    }
    return <span>Онлайн заявка на займ - отклонена</span>
  }
  // никогда не будет
  if (state === 'Processed') {
    return <span>Онлайн заявка на займ - обработанна</span>
  }
  return null
}

OnlineBidState.propTypes = {
  bid: PropTypes.object.isRequired,
}

export default OnlineBidState