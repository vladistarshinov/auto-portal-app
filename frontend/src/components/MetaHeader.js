import React from 'react';
import { Helmet } from 'react-helmet';

const MetaHeader = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Helmet>
    );
};

MetaHeader.defaultProps = {
    title: 'IGadgetShop',
    description: 'Мы продаем хорошие товары за доступные цены',
    keywords: 'электроника, купить гаджеты'
};

export default MetaHeader;
