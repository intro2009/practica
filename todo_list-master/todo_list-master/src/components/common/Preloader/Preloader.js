import React from 'react';
import preloader from '../../../images/preloader.svg';


const Preloader = props => {
    return (
        <div>
            <img width={props.width && props.width} alt="preloader" src={preloader}/>
        </div>
    )
}

export default Preloader;