import React, { useEffect } from 'react'
import { Link, Outlet, useParams, useLocation } from 'react-router-dom'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import useHttp from '../hooks/use-http';
import {getSingleQuote} from '../lib/api'
import LoadingSpinner from '../components/UI/LoadingSpinner';

function QuoteDetail() {
  const location = useLocation();
  const {quoteId} = useParams()
  const {sendRequest,data:loadedQuote,status,error} = useHttp(getSingleQuote,true);
  useEffect(()=>{
    sendRequest(quoteId)
  },[sendRequest,quoteId])

  if(status === 'pending'){
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    )
  }

  if(error){
    return <p className='centered focused'>
      {error}
    </p>
  }

  if(!loadedQuote.text){
    return <p className='centered'>No quote found!!</p>
  }

  return (
    <div>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      {location.pathname === `/quotes/${quoteId}` && <div className='centered'>
        <Link className='btn--flat' to={`/quotes/${quoteId}/comments`}>
          Load Comments
        </Link>
      </div>}
      <Outlet />
    </div>
  )
}

export default QuoteDetail