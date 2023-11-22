//import Navbar from "../../Navbar";
const Home = () => {

      return (
        <>
            <body className="rbt-header-sticky">
                {/* <!-- Start Header Area --> */}
                <header className="rbt-header rbt-header-10" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '85vh' }}>
                  {/* <Navbar /> Include the Navbar component */}
                  <h2 style={{ fontSize: '48px', color:'black'}}>Welcome <br/>to <br/></h2>
                  <h1 style={{ fontSize: '90px', color:'black'}}>Store Management System      
                  </h1>
                  <h2 style={{ fontSize: '36px', color:'black' }}>This is your one-stop solution for managing your store's inventory.
                  </h2>
                    
                </header>    
            </body>
        </>
    )
}
export default Home;  