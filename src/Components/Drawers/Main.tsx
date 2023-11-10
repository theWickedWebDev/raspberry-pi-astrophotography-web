import React from 'react';
import MainSidebar from './MainSidebar';


export default function () {
    return (
        <div className='AP-Drawers'>
            <React.Fragment>
                <MainSidebar defaultOpen={false} />
            </React.Fragment>
        </div>
    );
}
