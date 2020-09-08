import React from 'react'
import styles from './styles.module.css'

const component = ({ children }) => {
  return (
    <div className={styles.component}>
      <div>component</div>
    </div>
  )
}
export default component
