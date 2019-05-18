import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import reactsidenav from '../styles/react-sidenav.css'
import Link from 'next/link'
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faEnvelope, faUserCircle, faPaperPlane, faSearch } from '@fortawesome/free-solid-svg-icons'
library.add(faEnvelope, faUserCircle, faHome, faPaperPlane, faSearch)


class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }

    componentDidMount() {
        
      let cookies = new Cookies();

      this.setState({
          id: cookies.get('CookieSpaceArt')["id_user"]
      })

    }

    render() {
        return (
            <div>

                <style dangerouslySetInnerHTML={{ __html: reactsidenav }} />
                <SideNav
    onSelect={(selected) => {
        // Add your code here
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home">
    <Link href="/home">
        <NavItem eventKey="home" id="1">
            <NavIcon>
            <FontAwesomeIcon icon='home' style={{fontSize:'150%'}}/>
            </NavIcon>
            <NavText>
                Home
            </NavText>
        </NavItem>
        </Link>
        <Link as={`/profil/${this.state.id}`} href="/profil" >
        <NavItem eventKey="charts" id="2">
            <NavIcon>
            <FontAwesomeIcon icon='user-circle' style={{fontSize:'150%'}}/>
            </NavIcon>
            <NavText>
                Profil
            </NavText>
        </NavItem>
        </Link>
    </SideNav.Nav>
</SideNav>

            </div>
        );
    }
}


export default Menu;