import React, { Component } from 'react'
import logo from '../assets/list.png'


const logoStyle = {
    width: '3%',
    display: 'inline-block',
    verticalAlign: 'middle',
    paddingRight: '10px'
}

const todoListTextStyle = {
    display: 'inline-block',
    textAlign: 'center',
    verticalAlign: 'middle',
    margin: '0'
}

const brandDivStyle = {
    textAlign: "center",
    margin: '1.5em'
}

const navStyle = {
    backgroundColor: 'black',
    height: '40px',
    marginBottom: '2.5em'
}


export class Header extends Component {
    render() {
        return (
            <div>
                <div style={brandDivStyle}>
                    <img src={logo} alt="logo" style={logoStyle} />
                    <h1 style={todoListTextStyle}>TODO LIST</h1>
                </div>
                <div style ={navStyle}>
                </div>
            </div>
        );
    }
}

export default Header;