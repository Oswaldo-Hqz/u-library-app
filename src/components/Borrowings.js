import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const BorrowingsBoard = () => {
    const [content, setContent] = useState([]);
    
    useEffect(() => {
        const User = AuthService.getCurrentUser();

        UserService.getMyBorrowings(User.id).then(            
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

export default BorrowingsBoard;