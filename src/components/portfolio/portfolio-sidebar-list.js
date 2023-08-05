import react from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

const PortfolioSidebarList = (props) => {
    const PortfolioList = props.data.map(portfolioItem => {
        return (
            <div key={portfolioItem.id} className="portfolio-item-thumb">
                <div className="portfolio-item-thumb-img">
                    <img src={portfolioItem.thumb_image_url} />
                </div>

                <div className="text-content">
                    <div className="title">{portfolioItem.name}</div>
                
                <div className="actions">
                <a
                    className="action-icon"
                    onClick={() => props.handleEditClick(portfolioItem)}
                >
                    <FontAwesomeIcon icon="trash" />
                </a>

                <a
                    className="action-icon"
                    onClick={() => props.handleDeleteClick(portfolioItem)}
                >
                    <FontAwesomeIcon icon="edit" />

                </div>
            </div>
        );
    });


    return <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>;
};

export default PortfolioSidebarList;