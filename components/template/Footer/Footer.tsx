import React from 'react'
import { FooterTemplate } from './FooterTemplate'
import en from "./en.json"

export const Footer = () => {
  return (
    <FooterTemplate footer={en.footer} subscribe={en.footer.subscribe} links={en.footer.links} copyright={en.footer.copyright}/>
  )
}
