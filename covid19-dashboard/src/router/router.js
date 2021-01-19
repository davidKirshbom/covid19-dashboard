import React from 'react'
import { Link, Switch, Route, Router } from "react-router-dom";
import ThemeContext from '../context/ThemeContext'
import {useState}from 'react'
import history from './history'
import MainPage from '../components/MainPage'
import Navigationbar from '../components/Navigationbar'
import Menu from '../components/Menu'
import '../styles/style.scss'
import ManagerPage from '../components/ManagerPage';

export default () => {
const [isThemeWhite,setIsThemeWhite]=useState(true)
const [isMenuOpen,setIsMenuOpen]=useState(false)
    return (
<ThemeContext.Provider value={{isThemeWhite,setIsThemeWhite}}>
    <Router history={history}>
        <header>
                    <Navigationbar isMenuOpen={isMenuOpen} onClickBurgerButton={() => { console.log("click");setIsMenuOpen(!isMenuOpen)}}/>
        </header>
                <section className="main-section">
               
                    <Menu setIsOpen={setIsMenuOpen} isOpen={isMenuOpen}></Menu>
                    <Switch>
                        <Route path="/" exact component={MainPage} />
                        <Route path="/manger" component={ManagerPage}/>
            </Switch>   
        </section>
    </Router>
</ThemeContext.Provider >
)
}