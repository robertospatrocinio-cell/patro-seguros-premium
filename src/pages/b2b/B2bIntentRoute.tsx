import B2bIntentPageTemplate from "@/components/b2b/B2bIntentPageTemplate";
import { getIntentPage } from "@/data/b2bVertical";

const B2bIntentRoute = ({ slug }: { slug: string }) => {
  const page = getIntentPage(slug);
  return <B2bIntentPageTemplate page={page} />;
};

export default B2bIntentRoute;