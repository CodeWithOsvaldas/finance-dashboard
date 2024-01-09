import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cx from 'classnames';

interface NavLinkProps {
  name: string;
  href: string;
  icon: IconProp;
}

const NavLink = ({ name, href, icon }: NavLinkProps) => {
  const router = useRouter();
  const isRouteActive = router.pathname === href;
  return (
    <Link
      href={href}
      className={cx(
        'm-3 p-4 hover:border-b-2 hover:border-primary',
        { [`border-b-2 border-primary text-foreground`]: isRouteActive },
        { 'text-muted-foreground': !isRouteActive }
      )}
    >
      <span className="text-sm font-medium transition-colors hover:text-primary">
        <span className="mx-2">
          <FontAwesomeIcon icon={icon} />
        </span>
        {name}
      </span>
    </Link>
  );
};

export default NavLink;
