declare namespace AddBookModalNS{
   type BookFormData = {
  title: string
  author: string
  genre: string
  year: number
  status: 'Available' | 'Issued'
}

type BookModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: BookListNS.IBook) => void
  initialData?: BookFormData
  isLoading?:boolean;
}

}