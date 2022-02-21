import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Image } from "../types.ts";

let images: Image[] = [
  {
    id: "1",
    name: "image_01.jpg",
    size: 1000,
  },
];

// @desc    Get all images
// @route   GET /api/v1/images
const getImages = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: images,
  };
};

// @desc    Get single image
// @route   GET /api/v1/images/:id
const getImage = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const image: Image | undefined = images.find((p) => p.id === params.id);

  if (image) {
    response.status = 200;
    response.body = {
      success: true,
      data: image,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No image found",
    };
  }
};

// @desc    Add image
// @route   Post /api/v1/images
const addImage = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No data",
    };
  } else {
    const image: Image = body.value;
    image.id = v4.generate();
    images.push(image);
    response.status = 201;
    response.body = {
      success: true,
      data: image,
    };
  }
};

// @desc    Update image
// @route   PUT /api/v1/images/:id
const updateImage = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  const image: Image | undefined = images.find((p) => p.id === params.id);

  if (image) {
    const body = await request.body();

    const updateData: { name?: string; description?: string; price?: number } =
      body.value;

    images = images.map((p) =>
      p.id === params.id ? { ...p, ...updateData } : p
    );

    response.status = 200;
    response.body = {
      success: true,
      data: images,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No image found",
    };
  }
};

// @desc    Delete image
// @route   DELETE /api/v1/image/:id
const deleteImage = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  images = images.filter((p) => p.id !== params.id);
  response.body = {
    success: true,
    msg: "Image removed",
  };
};

export { getImages, getImage, addImage, updateImage, deleteImage };
