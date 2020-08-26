import React from 'react'
import styles from './styles.module.css'
import './auto.css'

const AutoScroll = ({ children }) => {
  return (
    <div className={styles.autoBox}>
      <div className={styles.autoContent}>
        <div className={styles.firstChild}>{children}</div>
        <div className={styles.secondChild}>{children}</div>
      </div>
    </div>
  )
}
export default AutoScroll
