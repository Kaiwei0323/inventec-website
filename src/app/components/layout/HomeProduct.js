import Right from "../icons/Right"
import ProductItem from '../product/ProductItem';
export default function HomeMenu() {
    return (
        <section className="">
            <div className="text-center">
                <h3 className="uppercase text-gray-600 font-semibold text-2xl leading-0 italic mb-6">
                    Key Product
                </h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <ProductItem
                    name="Qualcomm"
                    image="/qc01.jpg"
                    description={`Qualcomm 6490`}
                />
                <ProductItem
                    name="Nvidia"
                    image="/psox.jpg"
                    description={`Nvidia Jetson`}
                />
                <ProductItem
                    name="Industrial Tablet"
                    image="/53r.jpg"
                    description={`AI Acceleration Card`}
                />
            </div>
        </section>
    );
}