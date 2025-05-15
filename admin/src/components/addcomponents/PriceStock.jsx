import { Dialog, Switch } from "radix-ui";
import { Trash, Pen, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "../../ui/button.jsx";
import { Select } from "radix-ui";

const SingleProduct = ({ setPrice, setStock, price, stock }) => {
  const [open, setOpen] = useState(false);
  const [productInfo, setProductInfo] = useState(null);
  const [missing, setMissing] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    if (!price || !stock) return setMissing(true)
    const data = { price, stock };
    setProductInfo(data);
    setOpen(false);
  };

  return (
    <div className='mt-6'>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button className='button dark:bg-slate-600  font-medium leading-none dark:text-white outline-none outline-offset-1 hover:bg-aquamine-3 dark:hover:bg-slate-500 focus-visible:outline-2 select-none'>
            {productInfo ? "Edit Price & Stock" : "Add Price & Stock"}
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 bg-black/40 data-[state=open]:animate-overlayShow z-60' />
          <Dialog.Content className='fixed z-100 left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white dark:bg-gray-950 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow'>
            <div className='flex items-baseline justify-between'>
              <Dialog.Title className='m-0 text-[17px] font-medium dark:text-white'>
                Price & Stock
              </Dialog.Title>
              <span className={`text-[13px] text-red-500 opacity-80 ${!missing && "hidden"}`}>
                Please fill in all fields
              </span>
            </div>
            <Dialog.Description className='mb-5 mt-2.5 text-[15px] leading-normal dark:text-white'>
              Add and Edit product price and stock here.
            </Dialog.Description>
            <fieldset className='mb-[15px] flex items-center gap-5'>
              <label
                className='w-[90px] text-right text-[15px] dark:text-white'
                htmlFor='price'
              >
                Product Price
              </label>
              <input
                type='number'
                className='input leading-none dark:text-white border-aquamine-4 dark:border-slate-800 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                id='price'
                placeholder='E.g. 1000'
                onChange={(e) => setPrice(e.target.value)}
              />
            </fieldset>
            <fieldset className='mb-[15px] flex items-center gap-5'>
              <label
                className='w-[90px] text-right text-[15px] dark:text-white'
                htmlFor='stock'
              >
                Product Available Stock
              </label>
              <input
                type='number'
                className='input leading-none dark:text-white border-aquamine-4 dark:border-slate-800 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                id='stock'
                placeholder='E.g. 30'
                onChange={(e) => setStock(e.target.value)}
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
          <h2 className='text-lg font-semibold'>Details</h2>
          <div className='mt-4 rounded-md dark:text-white'>
            <p>Price: {productInfo.price}</p>
            <p>Stock: {productInfo.stock} </p>
          </div>
        </div>
      )}
    </div>
  );
};

const VariableProduct = ({ sizes, setSizes, setPrice, setStock }) => {
  const [form, setForm] = useState("");
  const [value, setValue] = useState("");
  const [stocke, setStocke] = useState("");
  const [pricee, setPricee] = useState("");
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    if (!sizes || sizes.length === 0) return;

    const totalStock = sizes.reduce((sum, item) => sum + Number(item.stock), 0);
    const lowestPrice = Math.min(...sizes.map((item) => Number(item.price)));

    setStock(totalStock);
    setPrice(lowestPrice);
  }, [sizes, setPrice, setStock]);

  const handleAddVariation = (e) => {
    e.preventDefault()
    if (!value || !stocke || !pricee || !form) return setMissing(true);
    let stock = stocke;
    let price = pricee;
    const newVariation = { form, value, stock, price };
    if (editIndex !== null) {
      const updatedVariations = [...sizes];
      updatedVariations[editIndex] = newVariation;
      setSizes(updatedVariations);
      setEditIndex(null);
      console.log("Updated Variation: ", updatedVariations);
    } else {
      setSizes([...sizes, newVariation]);
      console.log("Added Variation: ", newVariation);
      console.log(sizes)
    }
    setValue("");
    setStocke("");
    setPricee("");
    setForm("")

    setOpen(false);
  };

  const handleDelete = (index) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    const v = sizes[index];
    setForm(v.form);
    setValue(v.value);
    setStocke(v.stock);
    setPricee(v.price);
    setEditIndex(index);
    setOpen(true);
  };

  return (
    <div className='mt-6'>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button className='button dark:bg-slate-600  font-medium leading-none dark:text-white outline-none outline-offset-1 hover:bg-aquamine-3 dark:hover:bg-slate-500 focus-visible:outline-2 select-none'>
            Add Variation
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className='fixed z-60 inset-0 bg-black/40 data-[state=open]:animate-overlayShow' />
          <Dialog.Content className='fixed z-100 left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white dark:bg-gray-950 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow'>
            <div className='flex items-baseline justify-between'>
              <Dialog.Title className='m-0 text-[17px] font-medium dark:text-white'>
                {editIndex !== null ? "Edit Variation" : "Add Variation"}
              </Dialog.Title>
              <span className={`text-[13px] text-red-500 opacity-80 ${!missing && "hidden"}`}>
                Please fill in all fields
              </span>
            </div>
            <Dialog.Description className='mb-5 mt-2.5 text-[15px] leading-normal dark:text-white'>
              Add and Edit product variations here.
            </Dialog.Description>
            <fieldset className='mb-[15px] flex items-center gap-5'>
              <label
                htmlFor='type'
                className='w-[90px] text-right text-[15px] dark:text-white'
              >
                Variation Type
              </label>
              {/* <div className="relative w-full"> */}
              <Select.Root
                value={form}
                onValueChange={setForm}
                className='w-full relative'
              >
                <Select.Trigger className='flex flex-1 items-center border-aquamine-3 dark:border-slate-800 dark:focus:shadow-slate-950 justify-between w-full h-full p-2 border rounded-md dark:text-white outline-none pl-6 cursor-pointer'>
                  <Select.Value placeholder='Select a Variation Type' />
                  <Select.Icon>
                    <ArrowDown />
                  </Select.Icon>{" "}
                </Select.Trigger>
                {/* <Select.Portal> */}
                <Select.Content
                  side='bottom'
                  align='start'
                  position='popper'
                  sideOffset={4}
                  className='z-50 bg-white dark:bg-slate-800 rounded-lg shadow-md p-4'
                >
                  <Select.Viewport>
                    <Select.Item
                      className='p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white outline-none rounded-md'
                      value='size-numbers'
                    >
                      <Select.ItemText className='font-poppins'>
                        Size (Numbers)
                      </Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      className='p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white outline-none rounded-md'
                      value='size-letters'
                    >
                      <Select.ItemText className='font-poppins'>
                        Size (Letters)
                      </Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      className='p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white outline-none rounded-md'
                      value='color'
                    >
                      <Select.ItemText className='font-poppins'>
                        Color
                      </Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
                {/* </Select.Portal> */}
              </Select.Root>
              {/* </div> */}
            </fieldset>
            <fieldset className='mb-[15px] flex items-center gap-5'>
              <label
                htmlFor='variation'
                className='w-[90px] text-right text-[15px] dark:text-white'
              >
                Variation Value
              </label>
              <input
                className='input leading-none dark:text-white border-aquamine-4 dark:border-slate-800 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px] uppercase'
                id='variation'
                type='text'
                placeholder='Value (e.g., 45, XL, Black)'
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </fieldset>
            <fieldset className='mb-[15px] flex items-center gap-5'>
              <label
                htmlFor='stock'
                className='w-[90px] text-right text-[15px] dark:text-white'
              >
                Stock
              </label>
              <input
                type='number'
                id='stock'
                placeholder='Enter stock for the variation'
                className='input leading-none dark:text-white border-aquamine-4 dark:border-slate-800 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                value={stocke}
                onChange={(e) => setStocke(e.target.value)}
              />
            </fieldset>
            <fieldset className='mb-[15px] flex items-center gap-5'>
              <label
                htmlFor='price'
                className='w-[90px] text-right text-[15px] dark:text-white'
              >
                Price
              </label>
              <input
                type='number'
                id='price'
                placeholder='Enter price for the variation'
                className='input leading-none dark:text-white border-aquamine-4 dark:border-slate-800 dark:focus:shadow-slate-950 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                value={pricee}
                onChange={(e) => setPricee(e.target.value)}
              />
            </fieldset>
            <div className='mt-[25px] flex justify-end'>
              <Dialog.Close asChild>
                <button
                  className='inline-flex h-[35px] items-center justify-center rounded  bg-aquamine-4 px-[15px] font-medium leading-none  outline-none outline-offset-1 hover:bg-aquamine-3 dark:bg-slate-600 dark:hover:bg-slate-500 focus-visible:outline-2  select-none cursor-pointer'
                  onClick={(e) => handleAddVariation(e)}
                >
                  {editIndex !== null ? "Update" : "Save"}
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
      {sizes.length !== 0 && (
        <div className='border-y mt-4 pt-4 border-aquamine-4 dark:border-slate-950'>
          <h2 className='dark:text-white text-lg text-center'>
            Product Variations
          </h2>
          <div className='flex gap-4 my-6 flex-wrap'>
            {sizes.map((v, index) => {
              return (
                <div
                  key={index}
                  className='items-end gap-2 inline-flex border-1 border-aquamine-4 dark:border-slate-950 rounded-md p-4'
                >
                  <div className='flex flex-col gap-2'>
                    <span className='dark:text-white'>Type: {v.form}</span>
                    <span className='dark:text-white'>Value: {v.value}</span>
                    <span className='dark:text-white'>Stock: {v.stock}</span>
                    <span className='dark:text-white'>Price: {v.price}</span>
                  </div>

                  <Button
                    type='button'
                    variant='ghost'
                    className='size-14 md:size-16 flex items-center justify-center cursor-pointer bg-aquamine-5 text-white p-1 rounded dark:bg-slate-600 dark:hover:bg-slate-500 hover:bg-aquamine-4'
                    onClick={() => handleEdit(index)}
                  >
                    <Pen />
                  </Button>
                  <Button
                    type='button'
                    variant='ghost'
                    className='size-14 md:size-16 flex items-center justify-center cursor-pointer bg-red-600 dark:bg-red-500 p-1 rounded hover:bg-red-500'
                    onClick={() => handleDelete(index)}
                  >
                    <Trash />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const PriceStock = ({ price, stock, setStock, setPrice, sizes, setSizes, priceField }) => {
  const [hasVariations, setHasVariations] = useState(false);
  return (
    <div className='mt-6'>
      <div className='flex items-baseline justify-between'>
        <h2 className='font-semibold text-lg text-left dark:text-white'>
          Price & Stock
        </h2>
        <span className={`text-[13px] text-red-500 opacity-80 ${!priceField && "hidden"}`}>
          Please enter a valid price and stock
        </span>
      </div>
      <div className='flex items-center'>
        <label
          htmlFor='switch'
          className='pr-[15px] text-lg font-dm font-medium leading-none dark:text-white'
        >
          Has Variations?
        </label>
        <Switch.Root
          className='relative h-[25px] w-[42px] cursor-default rounded-full bg-gray-200 dark:bg-black/40 shadow-[0_2px_7px] shadow-black/40 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-aquamine-4 data-[state=checked]:dark:bg-black transition-all duration-300'
          id='switch'
          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
          checked={hasVariations}
          onCheckedChange={setHasVariations}
        >
          <Switch.Thumb className='block size-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]' />
        </Switch.Root>
      </div>
      {hasVariations ? (
        <VariableProduct
          setPrice={setPrice}
          setStock={setStock}
          sizes={sizes}
          setSizes={setSizes}
        />
      ) : (
        <SingleProduct
          price={price}
          stock={stock}
          setPrice={setPrice}
            setStock={setStock}
        />
      )}
    </div>
  );
};

export default PriceStock;
