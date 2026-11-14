import Navbar from "./Navbar";

export default function SiteNavbar({ overlay = false }: { overlay?: boolean }) {
  return <Navbar overlay={overlay} />;
}
