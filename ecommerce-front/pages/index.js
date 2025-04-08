import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";

export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const featuredProductId = '640de2b12aa291ebdf213d48';

  let featuredProduct = await Product.findById(featuredProductId);

  if (!featuredProduct) {
    console.warn("⚠️ Featured product not found! Falling back to latest product.");
    featuredProduct = await Product.findOne({}, null, { sort: { _id: -1 } });
  }

  const newProducts = await Product.find({}, null, { sort: { _id: -1 }, limit: 10 });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
