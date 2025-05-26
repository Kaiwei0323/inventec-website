import AllProductMenu from '../../components/layout/AllProduct';

export default function PlatformProductsPage({ params }: { params: { platform: string } }) {
  return <AllProductMenu platform={params.platform} />;
}
