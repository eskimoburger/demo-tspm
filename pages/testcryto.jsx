import React from 'react'
import Crypto from 'crypto' 


export default function testcryto() {
     React.useEffect(()=>{

        test0()

     },[])
    const [test,setTest] = React.useState("")
    function test0 (){
        var name = 'braitsch'; 
        var hash = Crypto.createHash('md5').update(name).digest('hex'); 
        setTest(hash)
        
        console.log(hash)
    }


    return (
        <div>
            {test}
        </div>
    )
}
