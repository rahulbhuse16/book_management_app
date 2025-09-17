import './App.css'
import BookList from './pages/BookList'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ToastContainer, Slide } from "react-toastify";

function App() {

  return (
    <Provider store={store}>
      <ToastContainer
        position="top-center"
        autoClose={1800}
        hideProgressBar
        transition={Slide} 
        closeOnClick
        draggable={false}
        theme="light"
      />
     <BookList></BookList>
    </Provider>
  )
}

export default App
