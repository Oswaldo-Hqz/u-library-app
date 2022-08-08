import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const BoardBorrowedBooks = () => {
    const [content, setContent] = useState([]);
    
    useEffect(() => {
        UserService.getAllBorrowings().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content = (error.response && error.response.data && error.response.data.message) ||
                                error.message ||
                                error.toString();
                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="container">
            {content}
        </div>
    );
};

export default BoardBorrowedBooks;