import B2bInsurerPageTemplate from "@/components/b2b/B2bInsurerPageTemplate";
import { getInsurerPage } from "@/data/b2bVertical";

const B2bInsurerRoute = ({ slug }: { slug: string }) => {
  const page = getInsurerPage(slug);
  return <B2bInsurerPageTemplate page={page} />;
};

export default B2bInsurerRoute;