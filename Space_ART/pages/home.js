import React from 'react';
import Menu from '../components/Menu'
import styles from '../styles/style.css';



class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.getElementById("1").style.backgroundColor = "black";
   }

    render() {
        return (
            <div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
            <Menu/>
            <p>IJDSJHDKSHFSJKDFHSJKDFHZEKFHSJQFGAZKJGBEJHSBE</p>
            <button style={{marginLeft:'20%'}} onClick={this.changeMenu}>OK </button>
    </div>
        );
    }
}

export default Home