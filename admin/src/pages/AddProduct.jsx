
import { ProductForm } from "../components/addcomponents"
import { Toast } from "radix-ui"
import { CheckCheck } from "lucide-react"




const AddProduct = () => {
  const handleAddProduct = (name, category) => {
    console.log('shiuu');
    
    if (!name || !category) {
      console.log('dccvhgbjk');
      
      return
    }
    console.log("Product Added: ", { name, category })

    
  }
  return (
    <div className='p-6 w-full'>
      <ProductForm handleAddProduct={handleAddProduct} />
    </div>
  );
}
export default AddProduct