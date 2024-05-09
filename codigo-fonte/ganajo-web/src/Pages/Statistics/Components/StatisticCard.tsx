import React from 'react'
import styles from './StatisticCard.module.scss'

interface StatisticCardProps {
    children : React.ReactNode
}

const StatisticCard = ({children} : StatisticCardProps) => {
  return (
    <div className={styles.card}>
        {children}
    </div>
  )
}

export default StatisticCard