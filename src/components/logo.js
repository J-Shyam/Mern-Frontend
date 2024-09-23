import React from 'react'
import Logo from '../assets/mylogo.jpg';

const Mylogo = ({w,h}) => {
  return (
  <>
    <img width={w} height={h} src={Logo} />
    </>
  )
}

export default Mylogo