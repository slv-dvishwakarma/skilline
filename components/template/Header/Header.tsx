import React from 'react'
import { HeaderTemplate } from './HeaderTemplate'
import en from "./en.json"

export const Header = () => {
  return (
    <HeaderTemplate mainmenu={en.mainmenu} content={en.content} login_form={en.login_form} signup_form={en.signup_form}/>
  )
}
