import React, { useState,useEffect } from 'react'
function UseEffect() {
    const [resourceType, setResourceType] = useState('posts');
    const [items,setItems]=useState([]);
    useEffect(
        ()=>{
            fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
            .then(response => response.json())
            .then(json => setItems(json))

            console.log("only cal when resourcetype will change");
        },[resourceType]
    );

    //call only one time
    // useEffect(
    //     ()=>{
    //         fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
    //         .then(response => response.json())
    //         .then(json => setItems(json))

    //         console.log("only one time it's calling")
    //     },[]
    // );


    //call everytime when render anything 
    // useEffect(
    //     ()=>{
    //         // fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
    //         // .then(response => response.json())
    //         // .then(json => setItems(json))
    //         console.log("call everytime when anything will render")
    //     }
    // );

    const [windowSize,setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
    const handleResize = () => {
        setWindowSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    console.log("only call once")
    // Cleanup on unmount
    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);

    return (
        <>
            <div>
                <button onClick={() => setResourceType("Posts")}>Posts</button>
                <button onClick={() => setResourceType("Users")}>Users</button>
                <button onClick={() => setResourceType("Comments")}>Comments</button>
            </div>
            <h1>{resourceType}</h1>
            {items.map(item=>{
                return <pre>{JSON.stringify(item)}</pre>
            })}
            <p>This is the window size: <b>{windowSize}</b></p>
        </>
    )
}
export default UseEffect