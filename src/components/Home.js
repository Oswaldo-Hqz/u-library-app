import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const Home = () => {
    const [content, setContent] = useState([]);
    const [searchBook, setSearchBook] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [actionCheckout, setActionCheckout] = useState(false);
    const [actionDetails, setActionDetails] = useState(false);
    const [details, setDetails] = useState();
    
    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content = (error.response && error.response.data) ||
                                error.message ||
                                error.toString();
                setContent(_content);
            }
        );

        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            setActionDetails(true);
            setActionCheckout(currentUser.role_name === "Student" ? true : false);
        }        
    }, []);

    const openDetails = (id) => {
        UserService.getBookDetails(id).then(
            (res) => {
                console.log(res);
                setDetails(res.data[0]);
            }
        )
    };

    const searchItemsByTitle = (searchValue) => {
        setSearchBook(searchValue);
        if (searchBook !== '') {
            const filteredData = content.filter((item) => {
                return Object.values(item.title).join('').toLowerCase().includes(searchBook.toLowerCase())
            })            
            setFilteredResults(filteredData);
        }
        else{
            setFilteredResults(content);
        }
    };

    const searchItemsByAuthor = (searchValue) => {
        setSearchBook(searchValue);
        if (searchBook !== '') {
            const filteredData = content.filter((item) => {
                return Object.values(item.author).join('').toLowerCase().includes(searchBook.toLowerCase())
            })            
            setFilteredResults(filteredData);
        }
        else{
            setFilteredResults(content);
        }
    };

    const searchItemsByGenre = (searchValue) => {
        setSearchBook(searchValue);
        if (searchBook !== '') {
            const filteredData = content.filter((item) => {
                return Object.values(item.genre_name).join('').toLowerCase().includes(searchBook.toLowerCase())
            })            
            setFilteredResults(filteredData);
        }
        else{
            setFilteredResults(content);
        }
    };

    return (
        <>
        <div className="container mb-5">
            <div className="row my-3">
                <div className="col-12">
                    <h3>Books</h3>
                </div>
            </div>
            <hr/>
            <div className="row mb-3">
                <div className="col-12">
                    <div className="card">
                        <h4 className="mx-3">Search</h4>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <label htmlFor="search">Title: </label>
                                    <input type="text" name="search"
                                            className="form-control" 
                                            placeholder="Search..." 
                                            onChange={(e) => searchItemsByTitle(e.target.value)} 
                                    />
                                </div>
                                <div className="col-4">
                                    <label htmlFor="search">Author: </label>
                                    <input type="text" name="search"
                                            className="form-control" 
                                            placeholder="Search..." 
                                            onChange={(e) => searchItemsByAuthor(e.target.value)} 
                                    />
                                </div>
                                <div className="col-4">
                                    <label htmlFor="search">Category: </label>
                                    <input type="text" name="search"
                                            className="form-control" 
                                            placeholder="Search..." 
                                            onChange={(e) => searchItemsByGenre(e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {searchBook.length > 1 ? (
                            filteredResults.map((item) => {
                                return (
                                    <div className="col" key={item.id.toString()}>
                                        <div className="card h-100">
                                            <div className="card-header">
                                                <h6 className="card-title">{item.title}</h6>
                                            </div>
                                            <div className="card-body">
                                                <p className="card-text">
                                                    <strong>Author: </strong>{item.author}
                                                </p>
                                                <p className="card-text">
                                                    <strong>Category: </strong>{item.genre_name}
                                                </p>
                                                <div className="d-grid gap-2 d-flex">
                                                    {actionDetails ? (
                                                            <button type="button" 
                                                                    className="btn btn-secondary w-100" 
                                                                    data-bs-toggle="modal" 
                                                                    data-bs-target="#DetailModal"
                                                                    onClick={() => openDetails(item.id)}>Details</button>
                                                        ): (
                                                            <></>
                                                        )
                                                    }
                                                    {actionCheckout ? (
                                                            <button className="btn btn-primary w-100">Check out</button>
                                                        ): (
                                                            <></>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            content.map((item) => {
                                return(
                                    <div className="col" key={item.id.toString()}>
                                        <div className="card h-100">
                                            <div className="card-header">
                                                <h6 className="card-title">{item.title}</h6>
                                            </div>
                                            <div className="card-body">
                                                <p className="card-text">
                                                    <strong>Author: </strong>{item.author}
                                                </p>
                                                <p className="card-text">
                                                    <strong>Category: </strong>{item.genre_name}
                                                </p>
                                                <div className="d-grid gap-2 d-flex">
                                                    {actionDetails ? (
                                                            <button type="button" 
                                                                    className="btn btn-secondary w-100" 
                                                                    data-bs-toggle="modal" 
                                                                    data-bs-target="#DetailModal"
                                                                    onClick={() => openDetails(item.id)}>Details</button>
                                                        ): (
                                                            <></>
                                                        )
                                                    }
                                                    {actionCheckout ? (
                                                            <button className="btn btn-primary w-100">Check out</button>
                                                        ): (
                                                            <></>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="DetailModal" tabIndex="-1" aria-labelledby="DetailModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="DetailModalLabel">Book Details</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                {
                    details ? (
                        <>
                            <div className="modal-body">                                
                                <p className="mb-1"><strong>Title: </strong>{details.title}</p>
                                <p className="mb-1"><strong>Author: </strong>{details.author}</p>
                                <p className="mb-1"><strong>Publication year: </strong>{details.published_year}</p>
                                <p className="mb-1"><strong>Category: </strong>{details.genre_name}</p>
                                <p className="mb-1"><strong>Copies available: </strong>{details.copies}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Check out</button>
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )
                }                
                </div>
            </div>
        </div>

        </>
    );
};

export default Home;
