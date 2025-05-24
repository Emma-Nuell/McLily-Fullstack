import { Form } from "radix-ui";

const BrandDesc = ({
  brandName,
  setBrandName,
  productDesc,
  setProductDesc,
  brandField,
  descField,
}) => {
  return (
    <div className='dark:text-white'>
      <Form.Field className='mb-4 grid' name='brand-name'>
        <div className='flex items-baseline justify-between'>
          <Form.Label className='text-lg font-medium leading-[35px] text-black dark:text-white'>
            Brand Name
          </Form.Label>
          <Form.Message
            className='text-[13px] text-red-500 opacity-80'
            match='valueMissing'
          >
            Please enter brand name
          </Form.Message>
          <span className={`text-[13px] text-red-500 opacity-80 ${!brandField && "hidden"}`}>
            Please enter a valid brand name
          </span>
        </div>
        <Form.Control asChild>
          <input
            type='text'
            placeholder='Enter brand name'
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            required
            className='input box-border max-w-5xl appearance-none rounded dark:text-white border-aquamine-4
     selection:text-white font-poppins pl-6 leading-none dark:border-slate-950 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
          />
        </Form.Control>
      </Form.Field>
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
          <span className={`text-[13px] text-red-500 opacity-80 ${!descField && "hidden"}`}>
            Please enter a valid product description
          </span>
        </div>
        <Form.Control asChild>
          <textarea
            rows={8}
            type='text'
            placeholder='Enter product description'
            value={productDesc}
            onChange={(e) => setProductDesc(e.target.value)}
            required
            className='box-border inline-flex w-full max-w-5xl appearance-none items-center justify-center rounded px-2.5 py-4 text-[15px] leading-none dark:text-white outline-none
           selection:text-white font-poppins pl-6 resize-none border-aquamine-4 dark:border-slate-950 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 scrollbar-hidden'
          />
        </Form.Control>
      </Form.Field>
    </div>
  );
};
export default BrandDesc;
