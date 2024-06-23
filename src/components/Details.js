
import React from "react";

const formatNumber = (phoneStr) => {
    let cleaned = ("", phoneStr).replace(/\D/g, "");

    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }

    return null;
};

/**
 *
 * @param {object} brewery - The brewery that is selected by the user to view more details.
 */
const starsArr = [1, 2, 3, 4, 5];

  let rating = 0

  const showHoverEffect = (e) => {
    const id = e.target.id;
    if (id <= rating) return;
    for (let i = rating + 1; i <= id; i++) {
      const ele = document.getElementById(i);
      ele.style.fill = "gold";
    }
  };

  const setRating = (rate) => {
    rating = rate;
  }

  const removeHoverEffect = (e) => {
    const id = parseInt(e.target.id);
    if (id <= rating) return;

    for (let i = rating + 1; i <= id; i++) {
      const ele = document.getElementById(i);
      ele.style.fill = "none";
    }
  };

  const giveRating = (e) => {
    const id = parseInt(e.target.id);
    if (id > rating) {
      for (let i = rating + 1; i <= id; i++) {
        const ele = document.getElementById(i);
        ele.style.fill = "gold";
      }
    } else {
      for (let i = id + 1; i <= rating; i++) {
        const ele = document.getElementById(i);
        ele.style.fill = "none";
      }
    }
    setRating(id);
  };
const Details = ({ brewery }) => {
    const breweryAddress =
        brewery.street +
        ", " +
        brewery.city +
        ", " +
        brewery.state +
        " " +
        brewery.postal_code;

    console.log(breweryAddress);


    return (
        <div>
            <div
                className='modal fade'
                id={"detailsModal_" + brewery.id}
                tabIndex='-1'
                role='dialog'
                aria-labelledby='detailsModal'
                aria-hidden='true'
                key={brewery.id}
            >
                <div
                    className='modal-dialog modal-dialog-centered'
                    role='document'
                >
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5
                                className='modal-title'
                                id='exampleModalLongTitle'
                            >
                                {brewery.name}
                            </h5>
                            <button
                                type='button'
                                className='close'
                                data-dismiss='modal'
                                aria-label='Close'
                            >
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <p>
                                
                                {brewery.brewery_type[0].toUpperCase() +
                                    brewery.brewery_type.slice(1)}
                            </p>
                            <p>
                            <img src='house.png' style={{ Height: '30px', width: '30px' }} alt='' />
                                <a
                                    href={
                                        "http://maps.google.com/?q=" +
                                        breweryAddress
                                    }
                                    rel='noopener noreferrer'
                                    target='_blank'
                                    aria-label='Brewery address'
                                >
                                    {breweryAddress}
                                </a>
                            </p>
                            <p>
                            <img src='Phone_icon.png' style={{ Height: '30px', width: '30px' }} alt='' />
                                {brewery.phone ? (
                                    <a
                                        aria-label='Brewery phone number'
                                        href={
                                            "tel:" + formatNumber(brewery.phone)
                                        }
                                    >
                                        {formatNumber(brewery.phone)}
                                    </a>
                                ) : (
                                    <span>None</span>
                                )}
                            </p>
                            <p>
                            <img src='link.png' style={{ Height: '30px', width: '30px' }} alt='' />
                                {brewery.website_url ? (
                                    <a
                                        aria-label='Brewery website'
                                        href={brewery.website_url}
                                        target='_blank'
                                        rel='noreferrer noopener'
                                    >
                                        {brewery.website_url}
                                    </a>
                                ) : (
                                    <span>None</span>
                                )}
                            </p>
                        </div>
                        <div style={{ display: "flex", width: "30%", margin: "1rem" }}>
                            <label style={{padding: '10px'}}> Rating: </label>
                        {starsArr.map((id) => (
                            <div key={id}>
                            <svg
                                width="1.5cm"
                                height="1.5cm"
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                viewBox="200 0 500 500"
                            >
                                <polygon
                                fill="none"
                                id={id}
                                stroke="black"
                                onClick={giveRating}
                                onMouseOver={showHoverEffect}
                                onMouseLeave={removeHoverEffect}
                                strokeWidth="10"
                                points="350,75  379,161 469,161 397,215
                                    423,301 350,250 277,301 303,215
                                    231,161 321,161"
                                />
                            </svg>
                            </div>
                        ))}
                        </div>
                        <div style={{ display: "flex", width: "60%", margin: "1rem" }}>
                            <label style={{padding: '10px'}}>Comments:</label>
                            <textarea></textarea>
                        </div>
                        <div className='modal-footer'>
                            <button
                                type='button'
                                className='btn btn-danger'
                                data-dismiss='modal'
                            >
                                Save Feedback
                            </button>
                            <button
                                type='button'
                                className='btn btn-danger'
                                data-dismiss='modal'
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
