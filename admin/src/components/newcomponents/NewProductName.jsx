import { Form } from "radix-ui"

const NewProductName = ({ productName, setProductName, nameField }) => {
  return (
    <Form.Field className='mb-4 grid' name='product-name'>
      <div className='flex items-baseline justify-between'>
        <Form.Label className='text-lg font-medium leading-[35px] text-black dark:text-white'>
          Product Name
        </Form.Label>
        <span
          className={`text-[13px] text-red-500 opacity-80 ${
            !nameField && "hidden"
          }`}
        >
          Please enter a valid product name
        </span>
      </div>
      <Form.Control asChild>
        <input
          type='text'
          placeholder='Enter product name'
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          className='input box-border max-w-5xl appearance-none rounded dark:text-white border-aquamine-4
     selection:text-white font-poppins pl-6 leading-none dark:border-slate-950 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px] capitalize'
        />
      </Form.Control>
    </Form.Field>
  );
};
export default NewProductName