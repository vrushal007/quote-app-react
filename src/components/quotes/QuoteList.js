import { Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes,ascending) => {
  return quotes.sort((a,b)=> {
    if(ascending){
      return a.id > b.id ? 1 : -1;
    }else{
      return a.id < b.id ? 1 : -1;
    }
  })
}

const QuoteList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const quoteParams = new URLSearchParams(location.search)
  const isSortAscending = quoteParams.get('sort') === 'asc';

  const sortedQuotes = sortQuotes(props.quotes,isSortAscending);
  const changeSortHandler = ()=>{
    navigate('/quotes?sort=' + (isSortAscending ? 'desc' : 'asc'));
  }

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler}>
          Sort {isSortAscending ? 'Descending' : 'Ascending'} 
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
