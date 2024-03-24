'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const components: { title: string; href: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog'
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card'
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress'
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area'
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs'
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip'
  }
];

type Props = {
  [key: string]: { title: string; href: string }[];
};

const movies: { title: string; href: string }[] = [
  {
    title: 'Phim Bộ',
    href: '/phim-bo'
  },
  {
    title: 'Phim Lẻ',
    href: '/phim-le'
  },
  {
    title: 'Phim Thuyết Minh',
    href: '/phim-thuyet-minh'
  },
  {
    title: 'Phim Hoạt Hình',
    href: '/phim-hoat-hinh'
  },
  {
    title: 'Shows',
    href: '/shows'
  },
  {
    title: 'Phim 10 Năm Trước',
    href: '/phim-muoi-nam-ve-truoc'
  }
];

export function Menu({ genres, countries, networks, years }: Props) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href='/' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Trang Chủ</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Phim Mới</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[90vw] max-w-[1440px] gap-3 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
              {movies.map(({ title, href }) => (
                <ListItem key={title} title={title} href={href}>
                  {title}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Thể Loại</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[90vw] max-w-[1440px] gap-3 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
              {genres.map(({ title, href }) => (
                <ListItem key={title} title={title} href={href}>
                  {title}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Quốc Gia</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[90vw] max-w-[1440px] gap-3 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
              {countries.map(({ title, href }) => (
                <ListItem key={title} title={title} href={href}>
                  {title}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Network</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[90vw] max-w-[1440px] gap-3 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
              {networks.map(({ title, href }) => (
                <ListItem key={title} title={title} href={href}>
                  {title}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Năm</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[90vw] max-w-[1440px] gap-3 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
              {years.map(({ title, href }) => (
                <ListItem key={title} title={title} href={href}>
                  {title}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'line-clamp-2 block select-none space-y-1 rounded-md p-3 text-sm leading-none text-muted-foreground no-underline outline-none transition-colors hover:bg-card hover:text-accent-foreground focus:bg-card focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            {children}
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';
