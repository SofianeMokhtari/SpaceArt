import React, { Component } from 'react'
import ReactCrop from "react-image-crop"
import Cookies from 'universal-cookie'
import Modal from 'react-awesome-modal'
import axios from 'axios'
import ChangeInfo from './ChangeInfo'

class Bannier extends Component {
    constructor(props) {
        super(props);
        let cookies = new Cookies();
        this.state = {
            profilesrc:null,
            src:null,
            modal:false,
            modal_follower:false,
            modal_following:false,
            number_follow:'0',
            follow:false,
            changeinfo:false,
            file: 'https://i2.wp.com/wpes.org.uk/wp-content/uploads/2018/02/default-banner.jpg?ssl=1',
            cookie_id_user: cookies.get('CookieSpaceArt')["id_user"],
            cookie_token: cookies.get('CookieSpaceArt')["jwt_token"]
        }
    }

    onSelectFile = e => {
        this.setState({
          profilesrc: e.target.files[0] 
        })
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener("load", () =>
            this.setState({ src: reader.result, modal: true})
          );
          reader.readAsDataURL(e.target.files[0]);
        }
    
      };

      onSelectFile1 = e => {
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener("load", () =>
            this.setState({ src: reader.result, modal: true })
          );
          reader.readAsDataURL(e.target.files[0]);
        }
    
      };

      onImageLoaded = (image, crop) => {
        this.imageRef = image;
      };
    
      onCropComplete = crop => {
        this.makeClientCrop(crop);
      };
    
      onCropChange = crop => {
        this.setState({ crop });
      };
    
      async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
          const croppedImageUrl = await this.getCroppedImg(
            this.imageRef,
            crop,
            "newFile.jpeg"
          );
          this.setState({ croppedImageUrl });
        }
      }
    
      openModal = () => {
        this.setState({
          changeinfo: true,
          visible:true,
        });
      }
    
      closeModal = () => {
        console.log(this.state.profilesrc);
        this.setState({
          changeinfo: false,
          visible:false,
        });
      }

      getCroppedImg = (image, crop, fileName) => {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
    
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
    
        return new Promise((resolve, reject) => {
          canvas.toBlob(blob => {
            if (!blob) {
              return;
            }
            blob.name = fileName;
            window.URL.revokeObjectURL(this.fileUrl);
            this.fileUrl = window.URL.createObjectURL(blob);
            resolve(this.fileUrl);
          }, "image/jpeg");
        });
      }
    
      handleChange= event => {
        this.setState({
          file: URL.createObjectURL(event.target.files[0]),
          modal1: true
        })
      }

  render() {
    const { crop, croppedImageUrl, src, file } = this.state;
    return (
    <div>
    {
      this.state.modal ? <section>
        <Modal visible={this.state.modal} width="400" height="300" effect="fadeInUp" onClickAway={() => this.setState({modal:!this.state.modal})}>
          <div>
            <h1>Recadrer votre photo</h1>
            <ReactCrop
              src={src}
              crop={crop}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
              imageStyle={{ width: "400px", height: "300px" }}
            />
            <button className="button is-dark is-outlined" onClick={() => this.setState({modal:!this.state.modal})}>Close</button>

          </div>
        </Modal>
      </section> : null
    }
    
    <div className="hero">
        <div className="parent">
        <div className="circle" style={{
          backgroundImage: `url(${croppedImageUrl})`, backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}>
          <input type="file" name="file" id="file" className="inputfile" onChange={this.onSelectFile} accept="image/jpeg, image/png"/>
          { this.checkId() == 1 ? <label htmlFor="file" className="file"> Change picture</label> : null }

        </div>

        <section className="hero" style={{
            backgroundImage: `url(${this.state.file})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center'
          }}>
          
          <ChangeInfo id={this.props.url} id_user={this.state.cookie_id_user} token={this.state.cookie_token} clickHandler={this.outputEvent} />

          </section>

        </div>
        </div>

  </div>
    )
  }

  checkId = () => {
      if ( this.props.url == this.state.cookie_id_user ) {
        return (1);
      } else {
        return (0);
      }
  }

  addProfile= () => {
    let cookies = new Cookies();
    
    var bodyFormData = new FormData();
    bodyFormData.append('picture', this.state.profilesrc);

    var headers = {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'api-token': this.state.cookie_token
    }

    axios.put('http://www.api-jaouad93.tk/api/profile/update_picture', bodyFormData, {headers:headers}).then((response) => {
        console.log(response.data)
    })
    .catch(function (error) {
      console.log(error.response.data);
    })
  }

  changeInfo = () => {
    let cookies = new Cookies();

    const changeinf = {
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

    axios.put('http://www.api-jaouad93.tk/api/profile/update', changeinf, { headers: headers}).then((response) => {
      console.log(response.data)
      this.setState({
          changeinfo:!this.state.changeinfo
      })
    })
    .catch((error) => {
      console.log(error.response.data);
    })
  }

  outputEvent = (data) => {
      this.setState({
          croppedImageUrl: data
      })
  }

}

export default Bannier;