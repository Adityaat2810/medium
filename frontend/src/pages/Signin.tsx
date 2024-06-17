import { AuthComponet } from "../components/authComponet"
import { Quote } from "../components/quote"

const Signin = () => {
  return (
    <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <AuthComponet type='signin'/>
            </div>
            <div className='hidden lg:block'>
                <Quote />
            </div>
            
        </div>
        
    </div>
  )
}

export default Signin