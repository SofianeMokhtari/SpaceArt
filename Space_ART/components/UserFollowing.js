import React, { Component } from 'react';

// import { Container } from './styles';

class UserFollowing extends Component {
    constructor() {
        super();
        this.state = {
            file: 'https://thecovenstead.com/wp-content/uploads/funny-facebook-silhouette-32-default-facebook-profile-picture-fingers-funny.jpg'
        }
    }

  render() {
        return this.props.user.map((following, key) => {
            return (
                <tbody>
                        <tr>
                          { (following.picture_url != "empty") ?
                          <th><img className="circle_following" src={following.picture_url}/></th>
                          : <th><img className="circle_following" src={this.state.file}/></th>
                          }
                          <td> {following.firstname + " " + following.lastname} <br/>
                          <button className="button is-success is-small" onClick={() => this.deleteFollower(following.id_user, key)}>Unfollow</button></td>
                        </tr>
                </tbody>
            )
    })
  }
}

export default UserFollowing