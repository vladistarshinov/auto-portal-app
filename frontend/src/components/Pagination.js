import React from 'react';
import { Pagination } from 'bootstrap-4-react';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';

const PaginationBox = ({ pages, page, isAdmin = false, keyword = '' }) => {

    const PaginationCenter = styled.nav`
        display: flex;
        justify-content: center
    `;
    return (
        pages > 1 && (
            <PaginationCenter aria-label="Page navigation example">
                <Pagination>
                    {[...Array(pages).keys()].map(x => (
                        <LinkContainer 
                            key={x+1} 
                            to={keyword 
                                ? `/search/${keyword}/page/${x+1}`
                                : `/page/${x+1}`
                            }
                        >
                            <Pagination.ItemLink text="dark" active={x + 1 === page}>{x+1}</Pagination.ItemLink>
                        </LinkContainer>
                    ))}
                </Pagination>
            </PaginationCenter>
        )
    );
};

export default PaginationBox;
