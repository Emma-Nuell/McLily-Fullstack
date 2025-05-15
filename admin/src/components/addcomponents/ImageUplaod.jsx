import { useCallback } from "react";
import { uploadImage } from "../../lib/api";
import { useDropzone } from "react-dropzone";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";

const ImageUplaod = ({
  images,
  setImages,
  isUploading,
  uploadedImages,
  setUploadedImages,
  setIsUploading,
  imageField1
}) => {
  const handleImageUpload = useCallback(
    async (files) => {
      if (!files.length) return;

      const previewImages = files.map((file) => ({
        id: URL.createObjectURL(file),
        file,
      }));

      setImages((prev) => [...prev, ...previewImages]);
    },
    [setImages]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      handleImageUpload(acceptedFiles);
    },
    [handleImageUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: true,
  });

  const removeImage = (id) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  const removeImageUpload = (url) => {
    setUploadedImages((prev) => prev.filter((imageUrl) => imageUrl !== url));
  };

  const uploadImagesToCloudinary = async () => {
    console.log("Uploading images to Cloudinary...");

    setIsUploading(true);
    const uploadedLinks = [];

    for (const image of images) {
      try {
        const uploadedUrl = await uploadImage(image.file);
        uploadedLinks.push(uploadedUrl);
        console.log("Uploaded image:", uploadedUrl);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }

    setUploadedImages((prev) => [...prev, ...uploadedLinks]);
    console.log(uploadedImages);

    setImages([]);
    setIsUploading(false);
  };

  const SortableItem = ({ image, onDelete }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: image.id });

    const style = {
      transform: transform ? CSS.Transform.toString(transform) : undefined,
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className='relative w-[150px] h-[150px] max-sm:w-[100px] max-sm:h-[100px] cursor-grab'
      >
        <img
          src={image.id}
          alt='uploaded'
          className='w-full h-full object-cover rounded-md'
        />
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation(); // ⛔ Prevent dragging from interfering
            console.log("Delete button clicked for:", image.id);
            onDelete(image.id);
          }}
          className='absolute top-1 right-1 cursor-pointer bg-red-600 text-white p-1 rounded'
        >
          <X />
        </button>
      </div>
    );
  };
  const handleDragend = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setImages((prevImages) => {
        const oldIndex = prevImages.findIndex((img) => img.id === active.id);
        const newIndex = prevImages.findIndex((img) => img.id === over.id);
        return arrayMove(prevImages, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className='mt-6'>
      <div className='flex items-baseline justify-between'>
        <h2 className='text-lg font-medium leading-[35px] text-black dark:text-white'>
          Image Upload
        </h2>
        <span className={`text-[13px] text-red-500 opacity-80 ${!imageField1 && "hidden"}`}>
          Please chose images for upload
        </span>
      </div>
      <div
        {...getRootProps()}
        className='border-dashed border-2 p-4 text-center border-aquamine-2 dark:border-black bg-aquamine-5 dark:bg-slate-700 cursor-pointer mb-4'
      >
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to select files</p>
      </div>
      {images.length > 0 && (
        <>
          <h1 className='my-6 text-center font-semibold text-lg'>
            Images to Upload
          </h1>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragend}
          >
            <SortableContext items={images.map((img) => img.id)}>
              <div className='flex overflow-auto scrollbar-hidden w-full gap-6 max-sm:justify-center max-sm:items-start'>
                {images.map((image) => {
                  return (
                    <SortableItem
                      key={image.id}
                      image={image}
                      onDelete={removeImage}
                    />
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        </>
      )}
      {images.length > 0 && (
        <div className='flex justify-end items-center pr-10 mt-6 flex-col'>   
          <button
            type='button'
            onClick={uploadImagesToCloudinary}
            disabled={isUploading || images.length === 0}
            className='mt-4 bg-aquamine-4 h-30 dark:bg-slate-500 uppercase dark:text-white px-6 py-2 rounded-md font-bold font-dm cursor-pointer'
          >
            {isUploading ? "Uploading..." : "Upload Images"}
          </button>
          <p className='text-red-500 text-left text-lg mt-4'>
            Upload images before submitting!
          </p>
        </div>
      )}
      {uploadedImages.length > 0 && (
        <>
          <h1 className='my-6 text-center font-semibold text-lg'>
            Uploaded Images
          </h1>
          <div className='flex flex-wrap gap-6 mb-10'>
            {uploadedImages.map((image, index) => {
              return (
                <div
                  key={index}
                  className='relative w-[150px] h-[150px] max-sm:w-[100px] max-sm:h-[100px]'
                >
                  <img
                    src={image}
                    alt='uploaded image'
                    className='w-full h-full object-cover rounded-md'
                  />
                  <button
                    type='button'
                    onClick={() => removeImageUpload(image)}
                    className='absolute top-1 size-14 md:size-20 right-1 flex items-center justify-center cursor-pointer bg-red-600 text-white p-1 rounded'
                  >
                    <X />
                  </button>
                  {index === 0 && (
                    <span className='absolute top-1 left-1 bg-black text-white text-xs px-2 py-1 rounded'>
                      Main Image
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default ImageUplaod;
