type ImageLinkProps = {
  src: string | undefined;
  href: string;
};

function ImageLink({src, href}: ImageLinkProps) {
  return (
    <a href={href}>
      <img src={src} alt="logo" className="h-36 w-36 object-cover mx-4" />
    </a>
  );
}
export default ImageLink;
