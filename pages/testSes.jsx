import React,{useEffect} from 'react'

const TestSes = () => {
    useEffect(() =>{
        if(window){
            
        }

    },[])

    return (
        <div>
            
        </div>
    )
}


export async function getServerSideProps({ params }) {
    const resData = await fetch(
      `https://demo-tspm-server.herokuapp.com/final-project/project-detail/${params.id}`
    );
    const data = await resData.json();
    console.log(data);
    return {
      props: {
        resources: data,
        params: params,
      },
    };
  }

export default TestSes
