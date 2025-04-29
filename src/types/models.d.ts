interface LoginDto {
  username: string;
  password: string;
}

interface PharmacyInfo {
  phone_number: string;
  address: string;
}

interface SoftwareInfo {
  previous_version: string;
  system_count: number;
  printer_count: number;
}
interface BaseEntity {
  id?: number;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;
}

interface Pharmacy extends BaseEntity {
  name: string;

  info: PharmacyInfo;

  software_info: SoftwareInfo;

  city_id: number;

  is_active: boolean;

  end_date: Date;

  members: User[];

  orders: Factor[];

  city: City;
}

interface City {
  id: number;

  name: string;

  slug: string;

  province_id: number;

  province: Province;

  pharmacies: Pharmacy[];
}
interface Province {
  id: number;

  name: string;

  slug: string;

  cities: City[];
}
interface TokenInfoType {
  context: {
    id: number;
    role: RoleEnum;
    permissions: PermissionEnum;
  };
  exp: number;
  iat: number;
}
interface LoginRes {
  access_token: string;
  user: User;
  username?: string;
  id: number;
}

enum RoleEnum {
  ADMIN = 'ADMIN',
  SUPPORT = 'SUPPORT',
  PHARMACY = 'PHARMACY',
  USER = 'USER',
}
enum service_typeEnum {
  WIRE = 'WIRE',
  OPENVPN = 'OPENVPN',
}
enum PermissionEnum {
  TicketResponse = 'ticket_response',
  AddTimeToPharmacy = 'add_time_to_pharmacy',
  AddPharmacy = 'add_pharmacy',
  EditPharmacy = 'edit_pharmacy',
  AddProduct = 'add_product',
  EditProduct = 'edit_product',
  AddPost = 'add_post',
  EditPost = 'edit_post',
}

interface OrderStatistics {
  total_orders: number;
  total_price: number;
  paid: { price: number; count: number };
  unpaid: { price: number; count: number };
  pending: { price: number; count: number };
}
interface Ip {
  id: number;

  title: string;

  ip: string;

  damein: string;

  port: number;

  max_user: number;
}
interface User {
  id?: number;

  title?: string;

  damein?: string;

  ip?: string;

  service_type?: string;

  username?: string;

  server_info?: string;

  phone_number?: string;

  role?: RoleEnum;

  user_id?: number;

  status?: boolean;

  pharmacy?: Pharmacy;

  permissions?: PermissionEnum[];

  createdAt?: Date;

  month?: number;

  // pharmacy: Pharmacy;
}
enum FactorTypeEnum {
  BUY = 'BUY',
  RENEW = 'RENEW',
  UPGRADE = 'UPGRADE',
}
enum FactorStatusEnum {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  PENDING = 'PENDING',
}

interface Factor extends BaseEntity {
  index: number;

  factor_items?: FactorItem[];

  creator_id?: number;

  price?: number;

  transactions?: Transaction[];

  creator?: User;

  user_id?: number;

  status: FactorStatusEnum;

  pharmacy: Pharmacy;
}

interface Wallet extends BaseEntity {
  user_id?: number;

  wallet_balance?: number;
}

interface Support extends BaseEntity {
  title: string;

  username: string;

  password: string;

  account_price: number;

  final_price: number;

  offer_price: number;

  orders: Factor[];

  uploads: Upload[];
}

interface Product extends BaseEntity {
  title?: string;

  damein?: string;

  service_type: service_typeEnum;

  ip?: number;

  port?: number;

  max_user?: number;

  users?: User[];
}

interface FactorItem extends BaseEntity {
  factor_id?: number;
  price?: number;
  final_price?: number;
  discount?: number;
  type?: FactorTypeEnum;
  creator_id?: number;
  payer_id?: number;
  product_id?: number | 'All';
  support_id?: number | 'All';
  factor?: Factor;
  creator?: User;
  product?: Product;
  support?: Support;
}

interface Transaction extends BaseEntity {
  card_no: string;

  factor_id: number;

  hash_id: string;

  price: number;

  factor: FactorItem;
}
