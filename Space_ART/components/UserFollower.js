import React, { Component } from 'react';

// import { Container } from './styles';

class UserFollower extends Component {
  render() {
      return this.props.user.map((following, key) => {
            return (
                <tbody>
                        <tr>
                          { (following.picture_url != 'Empty.') ?
                          <th><img className="circle_following" src={following.picture_url}/></th>
                          : <th><img className="circle_following" src={this.state.file}/></th>
                          }
                          <td> {following.firstname + " " + following.lastname} <br/>
                                <button className="button is-success is-small"
                                        onClick={() => console.log("delete ici")}>
                                        Unfollow
                                </button>
                            </td>
                        </tr>
                </tbody>
            );
        })
    }
}
export default UserFollower
