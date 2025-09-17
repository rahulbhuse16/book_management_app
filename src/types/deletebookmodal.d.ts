declare namespace DeletBookModalNS{
    type ConfirmDeleteBookModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  bookTitle?: string
  isLoading?:boolean;
}
}