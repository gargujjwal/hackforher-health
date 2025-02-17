import { LinkProps, Link as NextUiLink } from "@heroui/link";
import { Link as RouterLink } from "react-router-dom";

function Link({ href, ...props }: LinkProps) {
  return <NextUiLink {...props} as={RouterLink} to={href} />;
}

export default Link;
