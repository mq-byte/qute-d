import React from 'react'
import styles from './styles.module.css'

const Button = ({ children }) => {
  return (
    <div className={styles.autoBox}>
      <div className={styles.autoContent}>
        <div className={styles.firstChild}>{children}</div>
        <div className={styles.secondChild}>{children}</div>
      </div>
    </div>
  )
}
export default Button
