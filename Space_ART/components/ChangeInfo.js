import React, { Component } from 'react'
import DataFollower from '../components/DataFollower'
import DataFollowing from './DataFollowing'
import Follow from './Follow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSave } from '@fortawesome/free-solid-svg-icons'
library.add(faSave)
import axios from 'axios'
import Modal from 'react-awesome-modal'
import Cookies from 'universal-cookie'

export default class ChangeInfo extends Component {
        constructor(props) {
            super(props);
            let cookies = new Cookies();
            this.state = {
                load:true,
                changeinfo: false,
                firstname: '',
                lastname:'',
                city: '',
                age: '',
                weight: '',
                size:'',
                description: '',
                croppedImageUrl: null,
                cookie_token: cookies.get('CookieSpaceArt')["jwt_token"],
            }

            setTimeout(() => {
                this.setState({
                  load: false
                })
             }, 2000);
        }


        componentDidMount = () => {
            this.getProfile(this.props.id)
        }

  render() {
    if (this.state.load) {
        return <Loading />
    }
    return (
            <div className="hero-body">
            <div className="box herobox">
                <h1 className="title">
                    { `${this.state.firstname} ${this.state.lastname}`} 
                  </h1>
                <h2 className="subtitle">
                City : {this.state.city} <br/> Age : {this.state.age} ans <br/> Weight : {this.state.weight} kg <br/> Size : {this.state.size} cm<br/>  Description : {this.state.description}
                      <br />
                      <div style={{display:'flex', alignItems:'flex-end'}}>
                      
                    <Follow id={this.props.id} id_user={this.props.id_user} token={this.props.token} />
                    <DataFollowing id={this.props.id} token={this.props.token}/>
                    <DataFollower id={this.props.id} token={this.props.token}/>

                    </div>
                      <div style={{display:'flex', flexDirection:'row'}}>
                  <input type="file" accept="image/jpeg, image/png" name="banner" id="banner" className="banfile" onChange={this.handleChange} />
                  { this.checkId() == 1 ?
                  <button htmlFor="banner" className="button is-dark bannierfile"><label htmlFor="banner" >Change bannier</label></button> : null
                  }
                  { this.checkId() == 1 ? <button className="button is-danger bannierfile" onClick={() => this.setState({
                  changeinfo:!this.state.changeinfo
                  })}>Change your information</button> : null }
                 { this.checkId() == 1 ? <span className="icon" style={{fontSize:'25px', marginLeft:'3%', marginTop:'1.5%'}} onClick={this.addProfile}>
                    <FontAwesomeIcon icon='save' />
                </span> : null }
                </div>
                </h2>
                </div>
                
                {
            this.state.changeinfo ? <section>
              <Modal visible={this.state.changeinfo} width="400" height="auto" effect="fadeInDown"  onClickAway={() => this.setState({ changeinfo:!this.state.changeinfo})}>
                
                  <h1 style={{color:'black', textAlign:'center', fontWeight:'bold', fontSize:'175%'}}>Informations</h1>
                  <hr></hr>
                  <label className="label">Firstname</label>
                  <input className="input panel_input" type="text" placeholder="Firstname" onChange={this.onChangeFirstname}/>
                  <label className="label">Lastname</label>
                  <input className="input panel_input" type="text" placeholder="Lastname" onChange={this.onChangeLastname}/>
                  <label className="label" >City</label>
                  <input className="input panel_input" type="text" placeholder="City" onChange={this.onChangeCity}/>
                  <label className="label">Size</label>
                  <input className="input panel_input" type="number" placeholder="Size" onChange={this.onChangeSize}/>
                  <label className="label">Age</label>
                  <input className="input panel_input" type="number" placeholder="Age" onChange={this.onChangeAge} />
                  <label className="label">Weight</label>
                  <input className="input panel_input " type="number" placeholder="Weight" onChange={this.onChangeWeight}/>
                  <label className="label">Description</label>
                  <textarea className="textarea is-danger description" maxlength="100" placeholder="Description" onChange={this.onChangeDescription}/>
                  <br/>
                  <button className="button is-danger infobutton" onClick={() => this.changeInfo()}>Validate</button>
                  <button className="button is-dark closebutton" onClick={() => this.setState({ changeinfo:!this.state.changeinfo})}>Close</button>
                  
              </Modal>
            </section> : null
          }
            </div>
    );
  }

  onChangeFirstname = e => {
    this.setState({
        firstname: e.target.value
    })
}

onChangeLastname = e => {
    this.setState({
        lastname: e.target.value
    })
}

onChangeCity = e => {
  this.setState({
    city:e.target.value
  })
}

onChangeSize = e => {
  this.setState({
    size:e.target.value
  })
}

onChangeAge = e => {
  this.setState({
    age: e.target.value
  })
}

onChangeWeight = e => {
  this.setState({
    weight:e.target.value
  })
}


onChangeDescription = e => {
    this.setState({
      description: e.target.value
    })
  }

  checkId = () => {
    if ( this.props.id == this.props.id_user ) {
      return (1);
    } else {
      return (0);
    }
}

getProfile = (id) => {
    var headers = {
      "Access-Control-Allow-Origin": '*'
    }
    
    axios.get('http://www.api-jaouad93.tk/api/profile/get_profile/' + id, {headers: headers}).then((response) => {
      if(response.data["successful"]["firstname"] != null) {
      this.setState({
        firstname:response.data["successful"]["firstname"],
        lastname:response.data["successful"]["lastname"],
        size:response.data["successful"]["size"],
        weight:response.data["successful"]["weight"],
        age: response.data["successful"]["age"],
        city:response.data["successful"]["city"],
        description:response.data["successful"]["description"],
        load:false
      }) 
      let url = response.data.successful.picture_url;
      this.props.clickHandler(url)
    }
      else {
        this.setState({
        firstname: "Non défini",
        lastname: "Non défini",
        size:"Non défini",
        weight:"Non défini",
        age:"Non défini",
        city:"Non défini",
        description:"Non défini",
        })
      }
    })
    .catch(function (error) {
      console.log("Get Profil", error.response.data);
    })

  }

  changeInfo(){
    const changeinfo = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      city: this.state.city,
      weight:this.state.weight,
      age: this.state.age,
      size: this.state.size,
      description:this.state.description
    }

    var headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'api-token': this.state.cookie_token
    }

    axios.put('http://www.api-jaouad93.tk/api/profile/update', changeinfo, { headers: headers}).then((response) => {
      this.setState({
          changeinfo:false
      })
    })
    .catch(function (error){
      console.log(error.response.data);
    })
  }

}
