import React from 'react'
import ReactDOM from 'react-dom'
import Menu from '../components/Menu'
import Loading from '../components/Loading'
import "react-image-crop/dist/ReactCrop.css"
import styles from '../styles/style.css'
import axios from 'axios'
import style from '../styles/style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faEye, faEyeSlash, faSave, faHeart, faHeartBroken, faBullseye } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash, faEye, faEyeSlash, faSave, faHeart, faHeartBroken )
import Cookies from 'universal-cookie'
import Bannier from '../components/Bannier'
import Audio from '../components/Audio'
import Video from '../components/Video'

class Profil extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      load: true,
      crop: {
        width: 50,
        height: 50,
        x: 0,
        y: 0
      },
    }
    this.addProfile = this.addProfile.bind(this)  
  }

  render() {
    return (
    
      <div>

        <div>
          <Menu style={{position:'fixed'}} />
        </div>


        <style dangerouslySetInnerHTML={{ __html: style }} />
        <style dangerouslySetInnerHTML={{ __html: styles }} />

      <Bannier url={this.props.url.query.id}/>
      

      <div className="box upload">
      <Audio url={this.props.url.query.id}  />
      <Video url={this.props.url.query.id} />
      </div>

      </div>
    );
  }

  addProfile(e) {
    e.preventDefault();
    let cookies = new Cookies();
    
    var bodyFormData = new FormData();
    bodyFormData.append('picture', this.state.profilesrc);

    var headers = {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'api-token': cookies.get('CookieSpaceArt')["jwt_token"]
    }

    axios.put('http://www.api-jaouad93.tk/api/profile/update_picture', bodyFormData, {headers:headers}).then(function (response) {
    })
    .catch(function (error) {
      console.log(error.response.data);
    })
  }

}


export default Profil;
