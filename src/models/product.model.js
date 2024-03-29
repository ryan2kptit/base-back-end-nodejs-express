const { Schema, model } = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

// Declare the Schema of the Mongo model
var productSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },

    product_thumb: {
      type: String,
      required: true,
    },

    product_description: {
      type: String,
      require: true,
    },

    product_slug: {
      type: String,
      require: true,
    },

    product_price: {
      type: Number,
      required: true,
    },

    product_quantity: {
      type: Number,
      required: true,
    },

    product_type: {
      type: String,
      required: true,
      enum: ["Electronics", "Clothing", "Furniture"],
    },

    product_shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },

    product_attributes: {
      type: Schema.Types.Mixed,
      required: true,
    },

    product_rating_average: {
        type: Number,
        default: 4.5,
        min: [1, "Rating must be greater or equal 1.0"],
        max: [5, "Rating must be under or equal 5.0"]
    }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

const clothingSchema = new Schema(
  {
    brand: { type: String, require: true },
    size: String,
    material: String,
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
  },
  {
    collection: "clothes",
    timestamps: true,
  }
);

const electronicSchema = new Schema(
  {
    manufacture: { type: String, require: true },
    model: String,
    color: String,
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
  },
  {
    collection: "electronics",
    timestamps: true,
  }
);

const furnitureSchema = new Schema(
  {
    brand: { type: String, require: true },
    size: String,
    material: String,
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
  },
  {
    collection: "furnitures",
    timestamps: true,
  }
);

//Export the model
module.exports = {
  product: model(DOCUMENT_NAME, productSchema),
  clothing: model("Clothing", clothingSchema),
  eletronic: model("Electronics", electronicSchema),
  furniture: model("Furniture", furnitureSchema),
};
