import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Character from './Character'

export default function AllCharacters() {
    const [characters, setCharacters] = useState([]);
    const [offset, setOffset] = useState(0);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1)
    const [pages ,setPages] = useState(0)
    const [loading, setLoading] =useState(true)
    const dataLimit = 10;
    const pageLimit = 5;

    useEffect(async ()=>{
        const data= await fetchCharacters()
        setCharacters(data.data.results)
        setPages(data.data.total/dataLimit)
        setLoading(false)
    }, [])
    async function  goToNextPage() {
        try {
            setLoading(true);
            setCurrentPage((page) => page + 1); 
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
     }
   
    async function goToPreviousPage() {
        try {
            setLoading(true);
            setCurrentPage((page) => page - 1);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
     }
   
    async function changePage(event) {
        try {
            setLoading(true);
            const pageNumber = Number(event.target.textContent);
            setCurrentPage(pageNumber);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }
    
     //show the group of page numbers in the pagination
     const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;   
        if(start < 0)
         start=0  
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
     };

    const fetchCharacters = async () =>{
       const result =  await axios(`http://localhost:5000/characters/${offset}`,{
            headers:{Accept: 'application/json'},         
        })
       return (result.data)
    }
    useEffect(async () => {
        const data= await fetchCharacters()
        setCharacters(data.data.results)
    }, [offset])
    useEffect(async () => {
        setOffset(currentPage*dataLimit)
    }, [currentPage])
    
    
    const list = characters.map((char, index)=>{       
        return <Character key ={index} char={char}/>
    })
    const pagination = []
    pagination.push(<ul className="pagination justify-content-center">
    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button
        onClick={goToPreviousPage}
        className={`prev page-link ${currentPage === 1 ? 'disabled' : ''}`}
        >
        &laquo;
        </button>
    </li>
     {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
            <li key ={index} className={`page-item ${currentPage === item ? 'active' : null}`}
            >
                <button
                    key={index}
                    onClick={changePage}
                    className={`page-link ${currentPage === item ? 'active' : null}`}
                >
                    <span >{item}
                        
                    </span>
                </button>
            </li>
        ))}

    {/* next button */}
    <button
        onClick={goToNextPage}
        className={`next page-link ${currentPage === pages ? 'disabled' : ''}`}
    >
    &raquo;
    </button>
</ul>
)
   
    if(loading)
        return (<div><p>Loading...</p>{pagination}</div>)
    return (
        <div className="mt-4">
       
        <div className="card-group">
                {list}
            </div>
         
            <nav className = "pagination" aria-label="Page navigation p-3">
                {pagination}
               </nav>
        </div>
    )
}
