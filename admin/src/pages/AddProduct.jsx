import { useState } from "react"
import { ProductForm } from "../components/addcomponents"
import { Toast } from "radix-ui"
import { CheckCheck } from "lucide-react"




const AddProduct = () => {
  const [toast, setToast] = useState({ open: false, message: "", type: "success" })
  const handleAddProduct = (name, category) => {
    console.log('shiuu');
    
    if (!name || !category) {
      console.log('dccvhgbjk');
      
      setToast({ open: true, message: "Please fill all fields", type: "error" })
      return
    }
    console.log("Product Added: ", { name, category })
      setToast({
        open: true,
        message: (
          <>
            <CheckCheck /> Product Added Successfully
          </>
        ),
        type: "success",
      });
    
  }
  return (
    <div className='p-6 w-full'>
      <ProductForm handleAddProduct={handleAddProduct} />
      <Toast.Provider swipeDirection='right'>
        <Toast.Root
          open={toast.open}
          onOpenChange={(open) => setToast((prev) => ({ ...prev, open }))}
          className="grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-white p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
        >
          <Toast.Title className='mb-[5px] text-[15px] font-medium text-slate12 [grid-area:_title]'>
            HIIIIIII
          </Toast.Title>
          <Toast.Description asChild>hbdbhdsbvhsinvcsncj</Toast.Description>
        </Toast.Root>
        <Toast.Viewport className='fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]' />
      </Toast.Provider>
    </div>
  );
}
export default AddProduct