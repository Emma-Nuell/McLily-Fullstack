import { useState } from "react";
import NewDescription from "./NewDescription";
import NewImageUpload from "./NewImageUpload";
import NewPrice from "./NewPrice";
import NewProductName from "./NewProductName";
import { Form } from "radix-ui";

const NewProductForm = () => {
  const [productName, setProductName] = useState("");
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [priceLow, setPriceLow] = useState("");
  const [priceHigh, setPriceHigh] = useState("");
  const [description, setDescription] = useState("");
  const [nameField, setNameField] = useState(false);
  const [imageField, setImageField] = useState(false);
  const [descField, setDescField] = useState(false);
  const [priceField, setPriceField] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setNameField(false);
    setDescField(false);
    setPriceField(false);
    setImageField(false);

    const errors = {
      name: !productName,
      imageEmpty: uploadedImages.length === 0,
      priceLowInvalid: !priceLow || priceLow <= 0 || isNaN(priceLow),
      priceHighInvalid: !priceHigh || priceHigh <= 0 || isNaN(priceHigh),
      description: !description,
    };

    if (errors.name) return setNameField(true);
    if (errors.imageEmpty) return setImageField(true);
    if (errors.priceLowInvalid || errors.priceHighInvalid)
      return setPriceField(true);
      if (errors.description) return setDescField(true);
      
      const newArrival = [
          {
              name: productName,
              images: uploadedImages,
              priceLow,
              priceHigh,
              description
          },
      ]

      console.log(newArrival);

      setProductName("")
      setUploadedImages([])
      setDescription("")
      setPriceLow("")
      setPriceHigh("")
      
  };

    return (
      <Form.Root
        onSubmit={handleSubmit}
        className='bg-white dark:bg-slate-800 w-full p-6 rounded-lg shadow-md max-w-6xl mx-auto font-dm border-aquamine-4 border-2 dark:border-slate-500'
      >
        <h2 className='text-2xl font-semibold mb-4 dark:text-white'>
          New Arrival
        </h2>
        <NewProductName
          productName={productName}
          setProductName={setProductName}
          nameField={nameField}
        />
        <NewImageUpload
          images={images}
          setImages={setImages}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          uploadedImages={uploadedImages}
          setUploadedImages={setUploadedImages}
          imageField={imageField}
        />
        <NewPrice
          priceLow={priceLow}
          priceHigh={priceHigh}
                priceField={priceField}
                setPriceHigh={setPriceHigh}
                setPriceLow={setPriceLow}
        />
        <NewDescription description={description} descField={descField} setDescription = {setDescription} />
        <Form.Field className='mt-8'>
          <Form.Submit asChild>
            <div className='flex justify-end mr-14 '>
              <button
                type='submit'
                onClick={(e) => handleSubmit(e)}
                // disabled={uploadedImages.length !== images.length || isUploading}
                className='button dark:bg-slate-600  font-medium leading-none dark:text-white outline-none outline-offset-1 hover:bg-aquamine-3 dark:hover:bg-slate-500 focus-visible:outline-2 select-none'
              >
                Add New Arrival
              </button>
            </div>
          </Form.Submit>
        </Form.Field>
      </Form.Root>
    );
};
export default NewProductForm;
