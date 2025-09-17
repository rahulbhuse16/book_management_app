import './App.css'
import BookList from './pages/BookList'
import { Provider } from 'react-redux'
import { store } from './redux/store'

function App() {

  return (
    <Provider store={store}>
     <BookList></BookList>
    </Provider>
  )
}

export default App
