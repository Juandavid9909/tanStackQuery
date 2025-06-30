import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useProductMutation } from "..";

interface FormInputs {
  title:       string;
  price:       number;
  description: string;
  category:    string;
  image:       string;
}

export const NewProduct = () => {
  const productMutation = useProductMutation();

  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      category: "men's clothing",
      description: "Fugiat culpa esse eiusmod sint excepteur. Dolor enim excepteur ad est. Dolor enim excepteur ad est. Dolor enim excepteur ad est. Dolor enim excepteur ad est.",
      image: "https://media.alquimio.cloud/images/azure_KSP1_3L1F0AA.jpg",
      price: 150.22,
      title: "Teclado",
    }
  });

  const newImage = watch('image');

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    productMutation.mutate(data);
  };

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form className="w-full" onSubmit={ handleSubmit(onSubmit) }>

        <div className="flex justify-around items-center">
          
          <div className="flex-col w-[500px]">
            <Controller
              control={ control }
              name="title"
              rules={{ required: true }}
              render={ ({ field }) => (
                <Input
                  className="mt-2"
                  label="Titulo del producto"
                  onChange={ field.onChange }
                  type="text"
                  value={ field.value }
                />
              ) }
            />

            <Controller
              control={ control }
              name="price"
              rules={{ required: true }}
              render={ ({ field }) => (
                <Input
                  className="mt-2"
                  label="Precio del producto"
                  onChange={ (ev) => field.onChange(+ev.target.value) }
                  type="number"
                  value={ field.value?.toString() }
                />
              ) }
            />

            <Controller
              control={ control }
              name="image"
              rules={{ required: true }}
              render={ ({ field }) => (
                <Input
                  className="mt-2"
                  label="Url de la imagen del producto"
                  onChange={ field.onChange }
                  type="url"
                  value={ field.value }
                />
              ) }
            />

            <Controller
              control={ control }
              name="description"
              rules={{ required: true }}
              render={ ({ field }) => (
                <Textarea
                  className="mt-2"
                  label="Descripción del producto"
                  onChange={ field.onChange }
                  value={ field.value }
                />
              ) }
            />

            <Controller
              control={ control }
              name="category"
              rules={{ required: true }}
              render={ ({ field }) => (
                <select
                  className="rounded-md p-3 mt-2 bg-gray-800 w-full"
                  onChange={ field.onChange }
                  value={ field.value }
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              ) }
            />


            <br />
            <Button
              className="mt-2"
              color="primary"
              isDisabled={ productMutation.isPending }
              type="submit"
            >
              { productMutation.isPending ? "Cargando..." : "Crear producto" }
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-10 flex items-center" style={{
            width: '500px',
            height: '600px',
          }}>

            <Image
              src={ newImage }
            />
          </div>
          
        </div>


      </form>

    </div>
  )
}