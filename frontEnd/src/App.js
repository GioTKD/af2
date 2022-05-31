//import User from './SmartContracts/Users/Users';
//import { ethers } from "ethers";
import './App.css';
import Homepage from './Pages/Homepage/Homepage';
import {BrowserRouter,Route,Routes, useParams} from "react-router-dom";
import MyDesignes from './Pages/Mydesignes/mydesignes';
import DesignInfo from './Pages/myDesigneInfo/DesignInfo';
import MyPrinters from './Pages/Myprinters/MyPrinters';
import MetamaskLogin from './Pages/metamaskLogin/metamaskLogin';
import PrinterDetails from './Pages/Myprinters/PrinterDetails/PrinterDetails'
import SignIn from './Pages/signin/SignIn';
import WalletConnected from './component/WalletCheck/WalletConnected';
import LoadPrinter from './Pages/LoadPrinter/LoadPrinter';
import ModifyPrinters from './Pages/Myprinters/ModifyPrinters/ModifyPrinters';
import Modify from './Pages/Myprinters/ModifyPrinters/Modify';
import AddMaterials from "./Pages/Materials/AddMaterials"
import MyMaterials from './Pages/MyMaterials/MyMaterials';
import MountMaterial from './Pages/MountMaterial/MountMaterial';
import UpdateMaterial from './Pages/UpdateMaterial/UpdateMaterial';


/*export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 56, 97,1337] });

 export function WalletConnected(){
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React()
  const [loaded, setLoaded] = useState(false)
  
  useEffect(() => {
    injected
      .isAuthorized()
      .then((isAuthorized) => {
        setLoaded(true)
        if (isAuthorized && !networkActive && !networkError) {
          activateNetwork(injected)
        }
      })
      .catch(() => {
        setLoaded(true)
      })
  }, [activateNetwork, networkActive, networkError])

  if(loaded && networkActive)
    return <Outlet></Outlet>
  else if(loaded && !networkActive)
    return <Navigate to="login"></Navigate>
  else 
    return <span>Loading</span>


}*/




function App() {

  return(

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}></Route>
      <Route path="/login" element={<MetamaskLogin/>}></Route>
      <Route path="/signin" element={<SignIn/>}></Route>

      
          <Route path="myprinters"element={<WalletConnected>    <MyPrinters/>  </WalletConnected>   }/>
          <Route path='myprinters/:printerDetails' element={<WalletConnected> <PrinterDetails/> </WalletConnected> }/>
          <Route path="mydesignes" element={<WalletConnected>   <MyDesignes/>   </WalletConnected> }/>
          <Route path="mydesignes/:designInfo" element={ <WalletConnected> <DesignInfo/> </WalletConnected> }/>
          <Route path="addprinter" element={<LoadPrinter/>}/>
          <Route path="ModifyPrinters" element={<ModifyPrinters/>}/>
          <Route path="myprinters/Modify/:id" element={<Modify/>}/>
          <Route path="AddMaterials" element={<AddMaterials op="Add" />}/>
          <Route path="MyMaterials" element={<MyMaterials/>}/>
          <Route path ="myprinters/Modify/:id/MountMaterial" element={<MountMaterial/>}/>
          <Route path="UpdateMaterial/:id" element={<UpdateMaterial />}/>
          {/*<Route path="MyMaterials/UpdateMaterial/:id" element={<UpdateMaterial/>}/>*/}

    </Routes>
    </BrowserRouter>

  )
}

export default App;








