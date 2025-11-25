import {
  CreditCard,
  Building,
  Smartphone,
  TabletSmartphone,
  Home,
  Banknote,
  Wallet,
  History,
  ArrowRightLeft,
  Users,
  UserPlus,
  Receipt,
} from "lucide-react";
const UseIconsData = () => {
  const paymentOptions = [
    {
      name: "UPI Payment",
      description: "Pay instantly with UPI",
      icon: <Smartphone size={16} />,
    },
    {
      name: "Net Banking",
      description: "All major banks supported",
      icon: <Building size={16} />,
    },
    {
      name: "Debit Card",
      description: "Visa, Mastercard, RuPay",
      icon: <CreditCard size={16} />,
    },
    {
      name: "Credit Card",
      description: "Visa, Mastercard, American Express",
      icon: <CreditCard size={16} />,
    },
  ];

  const paymentHeaders = {
    "UPI Payment": {
      title: "UPI Payment",
      desc: "Pay instantly with UPI",
      icon: <TabletSmartphone size="16" />,
    },
    "Net Banking": {
      title: "Net Banking",
      desc: "All major banks supported",
      icon: <Building size="16" />,
    },
    "Debit Card": {
      title: "Debit Card",
      desc: "Visa, Mastercard, RuPay",
      icon: <CreditCard size="16" />,
    },
    "Credit Card": {
      title: "Credit Card",
      desc: "Visa, Mastercard, American Express",
      icon: <CreditCard size="16" />,
    },
  };

  const sidebarItems = [
    { label: "Dashboard", icon: Home, url: "/dashboard" },
    { label: "Manage Wallet", icon: Banknote, url: "/manage-wallet" },
    { label: "My Card", icon: CreditCard, url: "/my-card" },
    { label: "Bill & Recharges", icon: Receipt, url: "/bill-recharges" },
    {
      label: "Transaction History",
      icon: History,
      url: "/transaction-history",
    },
    { label: "Wallet Recharge", icon: Wallet, url: "/wallet-recharge" },
    {
      label: "Fund Transfer",
      icon: ArrowRightLeft,
      dropdown: [
        { label: "Add Payee", icon: UserPlus, url: "/fund-transfer/add-payee" },
        { label: "Payee List", icon: Users, url: "/fund-transfer/payee-list" },
      ],
    },
  ];
  return { paymentOptions, paymentHeaders, sidebarItems };
};

export default UseIconsData;
