import React, { useState } from 'react';
import { Form, Button } from 'bootstrap-4-react';

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push('/');
        }
    };

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Input 
                className="mr-sm-2 ml-sm-5" 
                type="text" 
                name="q" 
                placeholder="Поиск ..."
                onChange={(e) => setKeyword(e.target.value)}
            ></Form.Input>
            <Button 
                type="submit" 
                style={{ backgroundColor: 'gainsboro' }} 
                variant="outline-success" 
                className="p-1.5"
            >
                Поиск
            </Button>
        </Form>
    );
};

export default SearchBox;
