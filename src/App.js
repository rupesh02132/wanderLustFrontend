import { Routes, Route } from 'react-router-dom';
import CustomerRouters from './Routers/CustomerRouters';
import AdminRouter from './Routers/AdminRouter';


function App() {
  return (
    <>
     <div>
<Routes>
  <Route path="/*" element={<CustomerRouters/>}></Route>
  <Route path='admin/*' element={<AdminRouter/>}></Route>

  
</Routes>

   </div>
    </>
  );
}

export default App;

