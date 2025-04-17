// routes
import { PATH_DASHBOARD } from '@routes/paths.tsx';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';
import { getUserRole, getUserInfo } from '@utils/jwt.ts';
import {RoleEnum} from '../../../types/enums/role.enum'
// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const role = getUserRole();
const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  pharmacy: getIcon('ic_pharmacy'),
};

const navConfig = [
  {
    subheader: 'مدیریت',
    items:
      role == RoleEnum.ADMIN
        ? [            {
          title: 'کیف پول ',
          path: PATH_DASHBOARD.invoice.root,
          icon: ICONS.invoice,
          children: [{ title: 'افزایش', path: PATH_DASHBOARD.invoice.list }],
        },
        {
          title: 'سرورها ',
          path: PATH_DASHBOARD.product.root,
          icon: ICONS.ecommerce,
          children: [
            { title: 'لیست', path: PATH_DASHBOARD.product.list },
            { title: 'ساخت', path: PATH_DASHBOARD.product.new },
          ],
        },
        {
          title: 'فروشنده ها ',
          path: PATH_DASHBOARD.support.root,
          icon: ICONS.booking,
          children: [
            { title: 'لیست', path: PATH_DASHBOARD.support.list },
            { title: 'ساخت', path: PATH_DASHBOARD.support.new },
          ],
        },

          ]
        : [
          {
            title: 'کاربران',
            path: PATH_DASHBOARD.user.root,
            icon: ICONS.user,
            children: [
              { title: 'لیست کاربران', path: PATH_DASHBOARD.user.list },
              { title: 'ساخت کاربر', path: PATH_DASHBOARD.user.new },
              { title: 'ویرایش کاربر', path: PATH_DASHBOARD.user.edit(getUserInfo()?.id) },
            ],
          },
          ],
  },
];

export default navConfig;
