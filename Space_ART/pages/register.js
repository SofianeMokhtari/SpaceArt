
import Link from 'next/link'
import axios from 'axios'
import style from '../styles/style.scss'
import styles from '../styles/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faLock, faLockOpen, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faEnvelope, faLock, faLockOpen, faUser, faUserCircle)
import { NotificationContainer, NotificationManager } from 'react-notifications';
import notif from '../styles/notifications.css'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConf = this.onChangePasswordConf.bind(this);
        this.register = this.register.bind(this);
        this.state = {
            email: '',
            firstname: '',
            lastname: '',
            password: '',
            passwordconf: ''
        }
    }

    render() {
        return (
            <div>
                <style dangerouslySetInnerHTML={{ __html: style }} />
                <style dangerouslySetInnerHTML={{ __html: styles }} />

                <style dangerouslySetInnerHTML={{ __html: notif }} />

                <img src="https://media04.meinbezirk.at/event/2018/06/08/6/54606_XXL.jpg" style={{ width: '55%', height: "100vh" }} align="left" />

                <div className="divreg">
                    <div className="field">
                        <p class="title is-1 is-spaced">Register</p>
                        <div className="butt">
                            <Link href="/"><button className="button is-danger">Sign in</button></Link>
                            <Link href="/register" ><button className="button is-danger active">Sign up</button></Link>
                        </div>
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="email" value={this.state.email} onChange={this.onChangeEmail} placeholder="Email"></input>

                            <span className="icon is-small is-left">

                                <FontAwesomeIcon icon='envelope' />
                            </span>
                        </p>


                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="text" value={this.state.firstname} onChange={this.onChangeFirstname} placeholder="Firstname"></input>
                            <span className="icon is-small is-left">

                                <FontAwesomeIcon icon='user' />
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="text" value={this.state.lastname} onChange={this.onChangeLastname} placeholder="Lastname"></input>
                            <span className="icon is-small is-left">

                                <FontAwesomeIcon icon='user-circle' />
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="password" value={this.state.password} onChange={this.onChangePassword} placeholder="Password"></input>
                            <span className="icon is-small is-left">

                                <FontAwesomeIcon icon='lock-open' />
                            </span>
                        </p>
                    </div>
                    

                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="password" value={this.state.passwordconf} onChange={this.onChangePasswordConf} placeholder="Confirm Password"></input>
                            <span className="icon is-small is-left">

                                <FontAwesomeIcon icon='lock' />
                            </span>
                        </p>
                    </div>

                    <a className="button is-danger" onClick={this.register}>Validate</a>

                </div>
                
        <NotificationContainer/>
            </div>
        );
    }

    register(e) {
        if (this.state.email.length < 1 || this.state.password.length < 1 || this.state.firstname.length < 1 || this.state.lastname.length < 1 || this.state.passwordconf.length < 1) {
            alert("REMPLIS LES CHAMPS FILS DE PUTE !");
            return;
        }

        if (this.state.password.localeCompare(this.state.passwordconf)) {
            alert("MET LE MEME MOT DE PASSE FILS DEUP");
            return;
        }

        e.preventDefault();
        let self = this;
        const register = {
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            password: this.state.password,
            passwordconf: this.state.passwordconf
        }
        var headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://www.api-jaouad93.tk/api/users/create', register, { headers: headers }).then(function (response) {
            console.log(response.data);
            NotificationManager.success('You will be redirected ...', 'Successful registration');
            setTimeout(function () {
                window.location = "/"; 
             }, 2500);
        }).catch(function (error) {
            console.log(error.response.data);
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangeFirstname(e) {
        this.setState({
            firstname: e.target.value
        })
    }

    onChangeLastname(e) {
        this.setState({
            lastname: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangePasswordConf(e) {
        this.setState({
            passwordconf: e.target.value
        })
    }

}

export default Register;