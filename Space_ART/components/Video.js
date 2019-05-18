import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEyeSlash, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faEyeSlash, faEye, faTrash)
import axios from 'axios'
import Cookies from 'universal-cookie'

// import { Container } from './styles';

export default class Video extends Component {
    constructor(props) {
        super(props);
        let cookies = new Cookies();

        this.state = {
            filevideo: null,
            idvideo:null,
            playervideo:null,
            showvideo:false,
            arrayvideo:[],
            cookie_id_user: cookies.get('CookieSpaceArt')["id_user"],
            cookie_token: cookies.get('CookieSpaceArt')["jwt_token"],
            videodescription: '',
            videotitle: '',
            mp4: null
        }
    }

    componentDidMount() {
        this.getDataVideo(this.props.url);
    }

  render() {
    return (
<div className="profilpage">
          {this.checkId() == 1 ? <h1 className="title files" onClick={() => this.fileVideo()}>Upload a video</h1> : null }
          {
            this.state.filevideo ?
            <div>
          <input type="file" name="video" id="video" className="choicevideo" accept=".mp4" onChange={(e) => this.choiceVideo(e)} />
          <label for="video" className="videochoice">Choose your video</label>
          <span className="spaninput">
          <input type="text" placeholder="Title" className="input is-dark" onChange={(e) => this.changeTitleV(e)}></input>
          <input type="text" placeholder="Description" className="input is-dark" onChange={(e) => this.changeDescriptionV(e)}></input>
          </span>
          <button className="button is-dark" onClick={() => this.addVideo()}>ADD VIDEO</button> </div>
          : null }
          <div className="audio_div" style={{ backgroundColor: 'white' }}>
            <ul style={{ fontSize: '100%' }}>
              {
                this.showDataVideo(this.state.arrayvideo)
              }
            </ul>
          </div>
          <button className="trash" onClick={() => this.showVideo()}>{this.state.showvideo ? <a className="button is-danger is-outlined">
    <span className="icon">
    <FontAwesomeIcon icon='eye-slash' />
    </span>
    <span>Close Video</span>
  </a> : <a className="button is-danger">
    <span className="icon">
    <FontAwesomeIcon icon='eye' />
    </span>
    <span>Show Video</span>
  </a>}</button>
        </div>
    );
  }

  showDataVideo = () => {
    if (this.state.arrayvideo !== undefined) {
      return this.state.arrayvideo.map((video, index) => {
        return (
          <div key={index}>
          {
            this.state.showvideo ?
          
          <div className="box" >
            <li className="title is-4" onClick={() => {
              let id_video = video["id"]
              this.playerVideo(id_video);
            }}>{video["titre"]}
            {
              ((this.state.playervideo) && (video["id"] === this.state.idvideo)) ? 
              <ReactPlayer url={video["url"]} playing controls/>
              : null 
            }</li>
            <button className="button is-danger is-outlined" onClick={() => {
              let idvideo = video["id"]
              this.deleteVideo(idvideo)
            }
            }><span className="icon is-small is-left">

            <FontAwesomeIcon icon='trash' />
        </span></button>
            {
              ((this.state.playervideo) && (video["id"] === this.state.idvideo)) ?
            <button className="delete is-large" onClick={() => {
              let idvideo = video["id"]
              this.closeVideo(idvideo)
            }}></button> : null
          }
          </div>
          : null
        }
        </div>
        )
      });
      
    } else {
      return (
        <div>
          
          <p> Pas de vidéo disponible</p>
        </div>
      )
    }
  }

  checkId = () => {
    if ( this.props.url == this.state.cookie_id_user ) {
      return (1);
    } else {
      return (0);
    }
}


onChangeVideo = (e) => {
    this.setState({
      mp4: e.target.files[0]
    })
  }

changeTitleV = (e) => {
    this.setState({
      videotitle: e.target.value
    })
  }

  changeDescriptionV = (e) => {
    this.setState({
      videodescription: e.target.value
    })
  }

  showVideo = () => {
    if(this.state.showvideo == false) {
      this.setState({
        showvideo:true,
      })
    } else {
      this.setState({
        showvideo: false
      })
    }
  }

  closeVideo = (id) => {
    this.setState({
      playervideo:false,
      idvideo:id
    })
  }

  fileVideo = () => {
      this.setState({
          filevideo:!this.state.filevideo
      })
  }

  choiceVideo = e => {
    this.setState({
      mp4: e.target.files[0]
    })
  }

  addVideo = () => {
    var bodyFormData = new FormData();
    bodyFormData.append('video', this.state.mp4);
    bodyFormData.append('titre', this.state.videotitle);
    bodyFormData.append('description', this.state.videodescription);


    var headers = {
      'Content-Type': 'multipart/form-data',
      "Access-Control-Allow-Origin": "*",
      'api-token': this.state.cookie_token
    }
    axios.post('http://www.api-jaouad93.tk/api/video/upload_video', bodyFormData, { headers: headers }).then((response) => {
      this.state.arrayvideo.push(response.data["successful"])
      this.setState({
        arrayvideo: this.state.arrayvideo
      });
    })
      .catch((error) => {
        console.log("Add video", error);
      });
  }


  playerVideo = (id) => {
    if(this.state.playervideo === false) {
    this.setState({
      playervideo:true,
      idvideo: id
    }) }
     else {
      this.setState({
        playervideo:true,
        idvideo: id
      })
    }
  }

  deleteVideo = (id) => {

    var headers = {
      "Access-Control-Allow-Origin": "*",
      'api-token': this.state.cookie_token
    }
    axios.delete('http://www.api-jaouad93.tk/api/video/delete_video/' + id, { headers: headers }).then((response) => {
      this.setState({
        arrayvideo: this.state.arrayvideo.filter(item => item.id !== id)
      });
      console.log(response.data);
    })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  getDataVideo = (id) => {
      var headers = {
        'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Origin": "*",
      }
      axios.get('http://www.api-jaouad93.tk/api/video/get_all_video/' + id, { headers: headers }).then((response) => {
        let size = response.data["successful"].length

        let i = 0;
        for (i; i < size; i++) {
          this.setState({
            arrayvideo: [...this.state.arrayvideo, response.data["successful"][i]]
          });
        }
        
      })
        .catch((error) => {
            console.log(error.response.data.error);
        });
  }


  showDataVideo = () => {
    if (this.state.arrayvideo !== undefined) {
      return this.state.arrayvideo.map((video, index) => {
        return (
          <div key={index}>
          {
            this.state.showvideo ?
          
          <div className="box" >
            <li className="title is-4" onClick={() => {
              let id_video = video["id"]
              this.playerVideo(id_video);
            }}>{video["titre"]}
            {
              ((this.state.playervideo) && (video["id"] === this.state.idvideo)) ? 
              <ReactPlayer url={video["url"]} playing controls/>
              : null 
            }</li>
            <button className="button is-danger is-outlined" onClick={() => {
              let idvideo = video["id"]
              this.deleteVideo(idvideo)
            }
            }><span className="icon is-small is-left">

            <FontAwesomeIcon icon='trash' />
        </span></button>
            {
              ((this.state.playervideo) && (video["id"] === this.state.idvideo)) ?
            <button className="delete is-large" onClick={() => {
              let idvideo = video["id"]
              this.closeVideo(idvideo)
            }}></button> : null
          }
          </div>
          : null
        }
        </div>
        )
      });
      
    }
  }

}
