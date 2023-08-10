import React, { useState } from 'react';
import BannerSlider from './BannerSlider';
const App = () => {
    var jsonData = require("./data.json")
    const [sectionArray] = useState(jsonData.sectionArray)
    const [cardArray] = useState(jsonData.cardArray)
    const [bannerArray] = useState(jsonData.bannerArray)
    const [expandedSections, setExpandedSections] = useState([]);
    var cardClass = null;
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };
    const handleToggleExpansion = (secNo) => {
        if (expandedSections.includes(secNo)) {
            setExpandedSections(expandedSections.filter((sec) => sec !== secNo));
        } else {
            setExpandedSections([...expandedSections, secNo]);
        }
    };

    return (
        <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
            <div>
                <header className="header">Dashboard Header</header>
                <button className='darkmode' onClick={toggleTheme}>
                    {isDarkMode ? <i class="fa fa-moon-o" aria-hidden="true"></i> : <i class="fa fa-sun-o" aria-hidden="true"></i>}
                </button>
            </div>

            <section className="banner-section">
                <BannerSlider banners={bannerArray} />
            </section>
            <section className="section-section">
                {sectionArray.map((section) => {
                    const isExpanded = expandedSections.includes(section.sec_no);
                    const displayedCards = cardArray.filter(
                        (card) => card.parent_sec_no === section.sec_no
                    );
                    return (
                        <div key={section.id} className="section">
                            <h2 className='section-title'>{section.title} {displayedCards.length > 3 && (
                                <button
                                    className="toggle-button"
                                    onClick={() => handleToggleExpansion(section.sec_no)}
                                >
                                    {isExpanded ? <i class="fa fa-minus-circle" aria-hidden="true"></i> : <i class="fa fa-plus-circle" aria-hidden="true"></i>}
                                </button>
                            )}</h2>
                            <div className="section1">
                                {displayedCards
                                    .slice(0, isExpanded ? undefined : 3)
                                    .map((card) => (
                                        <div key={card.id} className='container' >
                                            < div className={card.cursor ? 'card carddata' : 'nocard carddata'} >
                                                <h3 className='card-header'>{card.card_title}</h3>
                                                {card.data_type === "text" ? < p className='para'>{card.data_value}</p> : ""}
                                                {card.data_type === "number" || card.data_type === "tags" || card.data === false || card.parent_sec_no === 3 &&
                                                    card.link === false && card.data_type !== "image" || card.data_type === "progress" ? <h4 className='text'>{card.data_value}</h4> : ""}
                                                {card.data_type === "image" ? <div><img src={card.data_value} width={200 + "px"} height={150 + "px"} /></div> : ""}
                                                {card.cursor === false ? <span className='nocursorcard'></span> : ""}
                                                {card.button ? <a href={card.redirect}><button className='btn'>{card.button_name}</button></a> : <a className='link' href={card.redirect}>{card.link_name}</a>}
                                                {/* <div className='note'>{card.note}</div> */}
                                            </div>

                                        </div>
                                    ))}

                            </div>
                        </div>
                    );
                })}
            </section >
        </div >
    );
};

export default App;
