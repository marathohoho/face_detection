import React from 'react';

const Rank = ({name, entries}) => {
    return (
        <div>
            <div className = "f3 white">
                {`${name} you current rank is: ...`}
            </div>
            <div className = "f1 white">
                {entries}
            </div>
        </div>
    )
}

export default Rank;