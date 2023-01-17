
import {BrowserRouter, Route,Router,Switch} from "react-router-dom"
import HeaderHome from "./components/Header/HeaderHome";
import Hompage from "./components/Pages/Hompage";
import FilmDangChieu from "./components/Pages/FilmDangChieu"
import FilmSapChieu from "./components/Pages/FilmSapChieu"
import MainFooter from './components/Footer/MainFooter'
import Details from "./components/Pages/Details";
import Login from "./components/Pages/Login/Login";
import RegisterUser from "./components/Pages/Register/RegisterUser";
import { createBrowserHistory } from "history";
import UserDetails from "./components/Pages/Users/UserDetails";

export const history = createBrowserHistory()
function App() {
  return (

    <Router history={history}>

    <HeaderHome/>
    <Switch>
    <Route exact path="/" component={Hompage}  />
    <Route exact path="/phimdangchieu" component={FilmDangChieu}  />
    <Route exact path={"/phimsapchieu"} component={FilmSapChieu}/>
    <Route exact path={"/details/:maPhim"} component={Details}/>
    <Route exact path={"/login"} component={Login}/>
    <Route exact path={"/register"} component={RegisterUser}/>
    <Route exact path={"/userdetails"} component={UserDetails}/>


    </Switch>
    
    <MainFooter/>
    
    </Router> 
  );
}

export default App;
