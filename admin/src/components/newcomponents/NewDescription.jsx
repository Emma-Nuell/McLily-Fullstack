import { Form } from "radix-ui"

const NewDescription = ({description, descField, setDescription}) => {
  return (
    <Form.Field className='mb-4 grid' name='product-name'>
      <div className='flex items-baseline justify-between'>
        <Form.Label className='text-lg font-medium leading-[35px] text-black dark:text-white'>
          Product Description
        </Form.Label>
        <Form.Message
          className='text-[13px] text-red-500 opacity-80'
          match='valueMissing'
        >
          Please enter product description
        </Form.Message>
        <span
          className={`text-[13px] text-red-500 opacity-80 ${
            !descField && "hidden"
          }`}
        >
          Please enter a valid product description
        </span>
      </div>
      <Form.Control asChild>
        <textarea
          rows={8}
          type='text'
          placeholder='Enter product description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className='box-border inline-flex w-full max-w-5xl appearance-none items-center justify-center rounded px-2.5 py-4 text-[15px] leading-none dark:text-white outline-none
           selection:text-white font-poppins pl-6 resize-none border-aquamine-4 dark:border-slate-950 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 '
        />
      </Form.Control>
    </Form.Field>
  );
}
export default NewDescription