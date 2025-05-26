import AllProductMenu from '../../components/layout/AllProduct';

export default async function PlatformProductsPage({ params }: { params: { platform: string } }) {
  return <AllProductMenu platform={params.platform} />;
}
