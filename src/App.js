import { Navigate, Route, Routes } from "react-router-dom";
import Comments from "./components/comments/Comments";
import Layout from "./components/layout/Layout";
import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import QuoteDetail from "./pages/QuoteDetail"
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to='/quotes'/>}/>
          <Route path="/quotes" element={<AllQuotes />}/>
          <Route path="/quotes/:quoteId" element={<QuoteDetail />} >
              <Route path="comments" element={<Comments />} />
          </Route>
          <Route path="/new-quote" element={<NewQuote />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
