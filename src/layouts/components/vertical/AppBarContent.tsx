// ** MUI Imports
import { ListItemButton, ListItemButtonProps, styled, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import React, { ElementType, useState } from 'react';

// ** Next Imports
import Link from 'next/link'
import pagesNavigation, { PagesNavigationType } from 'src/navigation/vertical/pages';
import { useRouter } from 'next/router';
import { handleURLQueries } from 'src/@core/layouts/utils'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

export const MenuNavLink = styled(ListItemButton)<ListItemButtonProps & { component?: ElementType; target?: '_blank' | undefined }>(({ theme }) => ({
  width: 'max-content',
  padding: '22px 10px',
  textTransform: 'uppercase',
  position: 'relative',
  fontWeight: 'bold',
  wordSpacing: 2.5,
  fontSize: 14,
  '&.active': {
    color: '#F4F5FA',
    backgroundColor: `${theme.palette.primary.dark}`
  },
  '&:hover': {
    color: '#F4F5FA',
    backgroundColor: `${theme.palette.primary.dark}`,
    transition: 'all 0.3s ease-in-out',  // Smooth transition for the hover effects
  },

  // Responsive adjustments
  [theme.breakpoints.down('xl')]: {
    fontSize: 10,  // Reduce font size for small screens
  },
}))

const AppBarContent = (props: Props) => {
  // ** Props
  props;

  const theme = useTheme();

  const router = useRouter();

  const navigationItems = pagesNavigation();

  const isNavLinkActive = (itemPath: string | undefined) => {
    if (itemPath === '#') {
      return false;
    }
    if (router.pathname?.split('/')[1] == itemPath?.slice(1) || handleURLQueries(router, itemPath)) {
      return true
    } else {
      return false
    }
  }

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        <Typography color={`${theme.palette.primary.dark}`} variant='h6' textTransform={'uppercase'} fontSize={18} fontWeight={700}>
          HỆ THỐNG THÔNG TIN VÀ CƠ SỞ DỮ LIỆU VỀ TÀI NGUYÊN VÀ MÔI TRƯỜNG
        </Typography>
        <Box sx={{ display: 'none' }}>
          {navigationItems.map((item: PagesNavigationType, index: number) => (
            <Box key={item.name} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
              <Link passHref href={item.path}>
                <MenuNavLink className={`${isNavLinkActive(item.path) ? 'active' : ''}`}>
                  {item.name}
                  {item.children && activeIndex === index && (
                    <Box sx={{
                      position: 'absolute',
                      backgroundColor: '#fff',
                      color: `${theme.palette.primary.dark}`,
                      top: 60,
                      left: 0,
                      zIndex: 1,
                      width: 'max-content',
                    }}>
                      {item.children.map((child) => (
                        <Link key={child.name} passHref href={child.path}>
                          <MenuNavLink sx={{ width: '100%', padding: '10px 10px', fontSize: 12, borderBottom: '1px solid #fff', textTransform: 'none ' }}>
                            {child.name}
                          </MenuNavLink>
                        </Link>
                      ))}
                    </Box>
                  )}
                </MenuNavLink>
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <UserDropdown />
      </Box>
    </Box>
  )
}

export default AppBarContent
