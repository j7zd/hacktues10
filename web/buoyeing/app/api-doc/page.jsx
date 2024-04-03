import { getApiDocs } from '@/lib/swagger';
import ReactSwagger from './react-swagger';

async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}

IndexPage.disableLayout = true;

export default IndexPage;