import React, {PropTypes} from 'react'

const Address = ({address}) => {
  const { region, locationType, location, street, house, apartment } = address
  return (
    <span>{region}, {locationType} {location} <br/> ул. {street} {house},{apartment} </span>
  )
}

Address.propTypes = {
  address: PropTypes.object.isRequired,
}

export default Address