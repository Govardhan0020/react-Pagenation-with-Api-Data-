import React, { useState,useEffect } from "react";
import { flushSync } from "react-dom";


const FetchData =() => {
   const [apiData, setApiData] = useState([]);
   const[number,setNumber] = useState(1)
   const [error,setError ] = useState(false)
   const [postPerPage] = useState(10)

    const URL ="https://fakestoreapi.com/products";
const Border = {
    border: '2px solid black '

}
    useEffect(() => {
        fetch(URL)
        .then( res => res.json())
        .then(apidata => setApiData(apidata))
        .catch((error) => console.log(error, " error "))
    },[]);
    function nextPage(){
        // if(number < 3) {
        //     setNumber(number + 1)
        //   number == 2 ? setError(!error) : setError(false) 
        // } else {
        //     setNumber(number)
        // }
        number <= 2 ?
         setNumber(number + 1) 
        //   ||  number == 2 ? setError(!error) : setError(false) 
        : 
         setNumber(3)  
    }

    useEffect(() => {
        number == 3 ? setError(!error) : setError(false)  ||  number == 0 ? setError(!error) : setError(false)  


    }, [number]);
    function previouspage() {
    //     if(number > 1){
    //         setNumber(number - 1)
           
    //     } else {
    //         setNumber(1)
    //    }
    number >= 1 ? 
      setNumber(number - 1)   
    :  setNumber(1)
    }
    console.log(number,'50===')
const filtered = apiData;

const lastPost = number * postPerPage;
const firstPost = lastPost - postPerPage;

const currentPost = filtered.slice(firstPost,lastPost)

const PageNumber=[];

for(let i = 1; i<= Math.ceil(filtered.length/postPerPage) ; i++ ) {

    PageNumber.push(i)   
} 

// const  verb = apiData > 20 ?  PageNumber : 'Data not found'  ;
// console.log(verb,'35===')
const pagehandler = PageNumber => {
    setNumber(PageNumber)
}
    return(
<>
<h3 className="apiData">API DATA  in Pagenation </h3>
   
   <h4 > {error && " Page not found "} </h4>

{
    apiData && apiData.length > 0 
    ?  <table>
        <thead> 
            <td style={Border} > S.No</td>
            <td style={Border}> Title </td>
            <td style={Border}> Description</td>
            <td style={Border}> Category  </td>
            <td style={Border}> Price   </td>
            <td style={Border}> count   </td>
            <td style={Border}> Rating    </td>
        </thead>
        <tbody>
         { 
           currentPost.map((item) => 
           <tr>
                <td style={Border}>{item.id} </td>
                <td style={Border}>{item.title} </td>
                <td style={Border}>{item.description} </td>
                <td style={Border}>{item.category} </td>
                <td style={Border}>$. {item.price} </td>
                <td style={Border}>{item.rating.count} </td>
                <td style={Border}>{item.rating.rate} </td>
           </tr>
            )  } 
        </tbody>
    </table>
   
   : <h4> Data not found </h4>
}  

<div>
<button onClick={previouspage} > Previos </button>
{
    PageNumber.map((ele) => {
        return(
            <button onClick={() => pagehandler(ele)} > {ele} </button>
        )
    })
}
<button onClick={nextPage} > Next  </button>

</div>

</>

    )
}

export default FetchData;