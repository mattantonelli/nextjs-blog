import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css"

export default function Custom404() {
  return (
    <Layout>
      <h1 className={utilStyles.headingLg}>Not Found</h1>
      <p>Sorry, I couldn't find that page.</p>
    </Layout>
  );
}