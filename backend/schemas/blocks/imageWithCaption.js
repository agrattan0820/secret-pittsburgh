export default {
  name: "imageWithCaption",
  title: "Image",
  type: "image",
  fields: [
    {
      name: "caption",
      type: "string",
      title: "Caption",
      options: {
        isHighlighted: true, // <-- make this field easily accessible
      },
    },
  ],
};
