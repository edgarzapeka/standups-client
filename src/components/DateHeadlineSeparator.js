import React from 'react'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui'
import Typography from 'material-ui/Typography'

const DateHedlineSeparator = props => {
    let options = { year: 'numeric', month: 'long', day: 'numeric' }
    let date = new Date(parseInt(props.date.split('/')[2]) + new Date().getTimezoneOffset()*60*1000)

    return (
        <Grid item xs={12} className={props.classes.root}>
            <Typography>{date.toLocaleDateString("en-US", options)}</Typography>
        </Grid>
    )
}

const styles = theme => ({
    root:{
        display: 'flex',
        width: '100%',
        padding: '16px',
        borderBottom: '1px solid black'
    },
})

export default withStyles(styles)(DateHedlineSeparator)