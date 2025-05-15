import { Dialog } from "radix-ui";
import { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

const NewPrice = ({
  priceLow,
  priceHigh,
  priceField,
  setPriceLow,
  setPriceHigh,
}) => {
  const [open, setOpen] = useState(false);
  const [missing, setMissing] = useState(false);
  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false);
  const [productInfo, setProductInfo] = useState(null);

const handleSave = (e) => {
  e.preventDefault();
  setMissing(false);
  setError(false);
  setError1(false);

  if (!priceLow || !priceHigh) {
    setMissing(true);
    return;
  }

  if (priceLow <= 0 || priceHigh <= 0) {
    setError(true);
    return;
  }

  if (priceLow > priceHigh) {
    setError1(true);
    return;
  }

  const data = { priceLow, priceHigh };
  setProductInfo(data);
  setOpen(false);
};
  return (
    <div className='mt-6'>
      <div className='flex items-baseline justify-between'>
        <h2 className='font-semibold text-lg text-left dark:text-white'>
          Price Range
        </h2>
        <span
          className={`text-[13px] text-red-500 opacity-80 ${
            !priceField && "hidden"
          }`}
        >
          Please enter a valid price range
        </span>
      </div>
      <div className='flex items-center'>
        <div className='mt-6'>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button className='button dark:bg-slate-600  font-medium leading-none dark:text-white outline-none outline-offset-1 hover:bg-aquamine-3 dark:hover:bg-slate-500 focus-visible:outline-2 select-none'>
                {productInfo ? "Edit Price Range" : "Add Price Range"}
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className='fixed inset-0 bg-black/40 data-[state=open]:animate-overlayShow z-60' />
              <Dialog.Content className='fixed z-100 left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white dark:bg-gray-950 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow'>
                <div className='flex items-baseline justify-between'>
                  <Dialog.Title className='m-0 text-[17px] font-medium dark:text-white'>
                    Price range
                  </Dialog.Title>
                  <span
                    className={`text-[13px] text-red-500 opacity-80 ${
                      !missing && "hidden"
                    }`}
                  >
                    Please fill in all fields
                  </span>
                  <span
                    className={`text-[13px] text-red-500 opacity-80 ${
                      !error && "hidden"
                    }`}
                  >
                    Please enter valid prices
                  </span>
                  <span
                    className={`text-[13px] text-red-500 opacity-80 ${
                      !error1 && "hidden"
                    }`}
                  >
                    Price low shouldnt be greater than price high
                  </span>
                </div>
                <Dialog.Description className='mb-5 mt-2.5 text-[15px] leading-normal dark:text-white'>
                  Add and Edit product price and range here.
                </Dialog.Description>
                <fieldset className='mb-[15px] flex items-center gap-5'>
                  <label
                    className='w-[90px] text-right text-[15px] dark:text-white'
                    htmlFor='priceLow'
                  >
                    Product Price Low
                  </label>
                  <input
                    type='number'
                    className='input leading-none dark:text-white border-aquamine-4 dark:border-slate-800 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                    id='priceLow'
                    value={priceLow}
                    placeholder='E.g. &#8358;1000'
                    onChange={(e) => setPriceLow(e.target.value)}
                  />
                </fieldset>
                <fieldset className='mb-[15px] flex items-center gap-5'>
                  <label
                    className='w-[90px] text-right text-[15px] dark:text-white'
                    htmlFor='priceHigh'
                  >
                    Product Price High
                  </label>
                  <input
                    type='number'
                    className='input leading-none dark:text-white border-aquamine-4 dark:border-slate-800 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                    id='priceHigh'
                    value={priceHigh}
                    placeholder='E.g. &#8358;30000'
                    onChange={(e) => setPriceHigh(e.target.value)}
                  />
                </fieldset>
                <div className='mt-[25px] flex justify-end'>
                  <Dialog.Close asChild>
                    <button
                      className='inline-flex h-[35px] items-center justify-center rounded  bg-aquamine-4 px-[15px] font-medium leading-none  outline-none outline-offset-1 hover:bg-aquamine-3 dark:bg-slate-600 dark:hover:bg-slate-500 focus-visible:outline-2  select-none cursor-pointer'
                      onClick={(e) => handleSave(e)}
                    >
                      Save changes
                    </button>
                  </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                  <button
                    className='absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full dark:text-white bg-aquamine-4 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:shadow-gray-950 hover:bg-aquamine-3 cursor-pointer focus:shadow-[0_0_0_2px] focus:shadow-aquamine-3 focus:outline-none'
                    aria-label='Close'
                  >
                    <Cross2Icon />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          {productInfo && (
            <div className='border-y mt-4 pt-4 border-aquamine-4 dark:border-slate-950 py-6'>
              <h2 className='text-lg font-semibold dark:text-dark-text'>Details</h2>
              <div className='mt-4 rounded-md dark:text-white'>
                <p>Price-Low: &#8358;{productInfo.priceLow}</p>
                <p>Price - High: &#8358;{productInfo.priceHigh} </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NewPrice;
