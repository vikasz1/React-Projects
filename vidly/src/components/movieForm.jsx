import React from 'react'

const MovieForm = ({ match,history }) => {
    return (
        <>
            <h1>Movie form -{match.params.id}</h1>
            <button className="btn btn-primary" onClick={()=>history.replace('/movies')}>Save</button>
        </>);
}

export default MovieForm;