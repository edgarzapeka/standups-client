import React, { Component } from 'react'
import { getAllTeams } from './../utils/api'
import TeamList from './TeamList'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { CircularProgress } from 'material-ui/Progress'
import Fade from 'material-ui/transitions/Fade'

import Button from 'material-ui/Button';
import classNames from 'classnames';
import Card, { CardContent } from 'material-ui/Card';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Input from '@material-ui/icons/Input';

class Home extends Component{
    state = {
        isDataFetched: false,
        teams: []
    }

    componentDidMount(){
        const myPromise = (time) => new Promise((resolve) => setTimeout(resolve, time))
        myPromise(2000).then(() => {
            const data = getAllTeams()
            this.setState({
                teams: data,
                isDataFetched: true
            })
        })
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    render(){
        const { isDataFetched, teams } = this.state
        const { classes } = this.props

        if (isDataFetched){
            return (
                <div>
                <Grid container spacing={0} className={classes.root}>
                    {/* <Grid item xs={6} sm={4} zeroMinWidth> */}
                    <TeamList team={null} subTeams={teams}/>
                    {/* </Grid> */}

                    
                </Grid>
                </div> 
            )
        }else{
            return (
                <Grid container spacing={0} className={classes.root}>
                    <Fade
                        in={!isDataFetched}
                        style={{
                            transitionDelay: !isDataFetched ? '800ms' : '0ms',
                        }}
                        unmountOnExit
                    >
                        <CircularProgress />
                    </Fade>
                </Grid>
            )
        }
    }
}

const styles = theme => ({
    root:{
        display: 'flex',
        height: '100%',
        padding: '16px',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    }
});

export default withStyles(styles)(Home)