import * as React from "react"
import * as styles from "./Title.module.scss"

export const Title = ({ text }: { text: string }) => <h1 className={styles.header}>{text}</h1>
