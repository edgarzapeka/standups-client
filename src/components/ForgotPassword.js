import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { InputAdornment } from 'material-ui/Input'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
  } from 'material-ui/Dialog';

import { validateEmail } from './../utils/functions';

import { Auth } from 'aws-amplify'

class ForgotPassword extends Component{
    constructor(props){
        super(props)

        this.submitForgotPassword = this.submitForgotPassword.bind(this)
    }

    state = {
        email: '',
        invalidUser: false,
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    handleClose = () => {
        this.setState({ 
            invalidUser: false, 
            email: '', 
        });
    };

    submitForgotPassword(){
        const { email } = this.state
        console.log(`Email: ${this.state.email}`)

        Auth.forgotPassword(email)
            .then(data => 
              this.props.history.push('/resetpassword'))
            .catch(err => 
                this.setState({
                    invalidUser: true,
                })
            );
    }

    render() {
        const { email } = this.state 
        const { classes } = this.props
        const isEmailValid = validateEmail(email)

        return (
            <Grid container spacing={0} className={classes.root}>
                <Paper elevation={2} className={classes.forgotpasswordContainer}>
                    <Typography variant='headline' className={classes.headline}>Forgot Password?</Typography>
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField
                            id="email"
                            label="Email"
                            defaultValue=""
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleChange('email')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <AccountCircle />
                                    </InputAdornment>
                                ),
                                }}
                        />
                        <Button color="primary" disabled={!isEmailValid} className={classes.button} onClick={this.submitForgotPassword}>
                            Send Code
                        </Button>
                    </form>
                    
                    <div className={classes.link}>
                        <Link to="/login" className={classes.linkmargin}>
                        Back to Sign In
                        </Link>
                    </div>
                </Paper>
                <Dialog
                    open={this.state.invalidUser}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        User does not exist in the system.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        )
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    forgotpasswordContainer: {
        padding: '36px',
        borderRadius: '20px'
    },
    button: {
        // margin: theme.spacing.unit,
        width: '50%',
        margin: '10px auto',
        borderRadius: '30px',
        color: '#21a2ff'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 240,
    },
    link: {
      color: '#448AFF',
      marginTop: '10px'  
    },
    linkmargin: {
        marginLeft: '10px',
    },
    headline: {
        textAlign: 'center',
        fontSize: '1.6rem'
    },
});
  
export default withStyles(styles)(ForgotPassword)