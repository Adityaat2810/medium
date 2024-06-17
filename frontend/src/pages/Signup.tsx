import { AuthComponet } from '../components/authComponet';
import { Quote } from '../components/quote';

const Signup = () => {
  return (
    <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <AuthComponet type='signup'/>
            </div>
            <div className='hidden lg:block'>
                <Quote />
            </div>
            
        </div>
        
    </div>
  )
}

export default Signup