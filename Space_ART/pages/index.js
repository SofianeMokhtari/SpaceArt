import Link from 'next/link'
import axios from 'axios'
import style from '../styles/style.scss'
import styles from '../styles/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
library.add(faEnvelope, faLock)
import CookieConsent from "react-cookie-consent";
import Cookies from 'universal-cookie';



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.log = this.log.bind(this);
    this.state = {
      email: '',
      password: '',
      cookies: Cookies,
      cookienull: false,
      id_user:''
    }
  }


  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <img src="https://media04.meinbezirk.at/event/2018/06/08/6/54606_XXL.jpg" style={{ width: '55%', height: "100vh" }} align="left" />

        {
          this.state.cookienull ?
        <div className="divlog">
          <div className="field">
            <p class="title is-1 is-spaced">Login</p>
            <div className="butt">
              <Link><button className="button is-danger active">Sign in</button></Link>
              <Link href="/register"><button className="button is-danger">Sign up</button></Link>
            </div>
            <p className="control has-icons-left has-icons-right">
              <input className="input" type="email" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail}></input>
              {console.log(this.state.email)}
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon='envelope' />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input className="input" type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword}></input>
              <span className="icon is-small is-left">

                <FontAwesomeIcon icon='lock' />
              </span>
            </p>
          </div>
          
        {this.state.cookies}
          <a className="button is-danger" onClick={this.log}>Validate</a>

        </div>

        : <div>Accepter les cookies pour pouvoir accéder au site.</div> }

        <CookieConsent
          onAccept={() => this.setState({cookienull:true})}
          enableDeclineButton
          declineButtonText="Decline (optional)"
          onDecline={() => {alert("nay!")}}
          cookieName="CookieSpaceArt"
        >
          This website uses cookies to enhance the user experience.{" "}
        </CookieConsent>

      </div>
    )
  }

  log(e) {
    e.preventDefault();
    const login = {
      email: this.state.email,
      password: this.state.password
    }
    var headers = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    }
    axios.post('http://www.api-jaouad93.tk/api/users/login', login, { headers: headers }).then(function (response) {
      console.log(response.data);
      let cookies = new Cookies();
      let data_cookie = {
        firstname: response.data["firstname"],
        lastname: response.data["lastname"],
        jwt_token: response.data["jwt_token"],
        id_user: response.data["id_user"]
      }
      cookies.set('CookieSpaceArt', JSON.stringify(data_cookie), {path : '/'});
      console.log(cookies.get('CookieSpaceArt')["firstname"]);
    })
      .catch(function (error) {
        console.log(error.response.data);
      });

  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

}


export default Login;