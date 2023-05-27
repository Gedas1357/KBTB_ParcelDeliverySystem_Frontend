import CustomerTable from "./CustomerTable";
import Register from "./Register";

const CustomerPage = () => {
    return (
        <div className='flex flex-row w-screen h-screen justify-evenly'>
            <div className='flex flex-col basis-3/5 h-3/5 justify-evenly self-center'>
                <h1 className="self-center">Customers</h1>
                <CustomerTable/>
            </div>
            <div className='flex flex-col basis-1/5 h-3/5 self-center'>
                <h1 className="self-center">Add a customer</h1>
                <Register />
            </div>
        </div>
    )
}

export default CustomerPage;