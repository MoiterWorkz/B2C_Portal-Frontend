import React from "react";
import {
  Shield,
  CreditCard,
  Send,
  QrCode,
  Scan,
  Phone,
  Zap,
  Receipt,
  CircleCheckBig,
  TrendingUp,
} from "lucide-react";

const Mobile = () => {
  return (
    <div className="relative mx-auto w-80 h-[640px]">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black rounded-[3rem] border-4 border-[#fad489]/40 shadow-2xl shadow-[#fad489]/20">
        <div className="absolute inset-3 bg-white rounded-[2.5rem] overflow-hidden border border-[#fad489]/20 shadow-inner">
          {/* Top Status Bar */}
          <div className="h-12 bg-gradient-to-r from-white via-gray-50 to-white flex items-center justify-between px-6 text-xs relative border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-black">9:41</span>
              <div className="w-1 h-1 bg-primary rounded-full"></div>
              <span className="text-primary text-xs font-bold">●</span>
            </div>
            <div className="absolute left-1/2 top-3 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full border border-gray-200"></div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-primary rounded-full"></div>
                <div className="w-1 h-3 bg-primary/70 rounded-full"></div>
                <div className="w-1 h-3 bg-primary/40 rounded-full"></div>
              </div>
              <div className="w-7 h-4 border-2 border-black rounded-sm relative bg-white">
                <div className="absolute inset-0.5 bg-primary rounded-sm"></div>
                <div className="absolute -right-1 top-1 w-1 h-2 bg-black rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 space-y-6 bg-white">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-3xl font-bold leading-tight text-black">
                    MW
                  </h3>
                  <div className="text-sm font-normal leading-tight">
                    Moiter Workz
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Secure • Fast • Reliable
                </p>
              </div>

              {/* QR Icon */}
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                  <QrCode className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Digital Wallet Card */}
            <div className="flex flex-col gap-6 rounded-xl bg-gradient-to-br from-background to-card text-foreground shadow-2xl shadow-primary/25 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-12 translate-x-12"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/5 rounded-full translate-y-8 -translate-x-8"></div>
              <div className="p-5 relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm font-medium">
                      Digital Wallet
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-lg font-semibold text-foreground">
                        Connected & Secure
                      </span>
                    </div>
                    <p className="text-xs text-primary font-medium">
                      All transactions protected
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button className="inline-flex items-center justify-center gap-1.5 px-3 h-8 rounded-md bg-primary text-primary-foreground font-semibold text-xs flex-1 shadow-lg hover:bg-primary/90">
                    <CreditCard className="h-3 w-3 mr-1" />
                    Add Money
                  </button>
                  <button className="inline-flex items-center justify-center gap-1.5 px-3 h-8 rounded-md bg-muted text-foreground font-semibold text-xs flex-1 shadow-lg hover:bg-muted/80 backdrop-blur-sm">
                    <Send className="h-3 w-3 mr-1" />
                    Pay Bills
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-black px-1">
                Quick Services
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <ServiceCard color="blue" icon={<Scan />} label="Scan & Pay" />
                <ServiceCard
                  color="green"
                  icon={<Phone />}
                  label="Mobile Bills"
                />
                <ServiceCard
                  color="yellow"
                  icon={<Zap />}
                  label="Electricity"
                />
                <ServiceCard
                  color="purple"
                  icon={<Receipt />}
                  label="All Bills"
                />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-black px-1">
                Recent Activity
              </h4>
              <ActivityItem
                bg="green-100"
                icon={<CircleCheckBig className="h-5 w-5 text-green-600" />}
                title="Electricity Payment"
                subtitle="TNEB • Today, 2:30 PM"
                amount="-₹1,250"
                status="Completed"
                statusColor="green-600"
              />
              <ActivityItem
                bg="primary/20"
                icon={<TrendingUp className="h-5 w-5 text-primary" />}
                title="Cashback Earned"
                subtitle="Reward • Yesterday"
                amount="+₹25"
                status="Credited"
                statusColor="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quick Service Card Component
const ServiceCard = ({ color, icon, label }) => (
  <div
    className={`flex flex-col gap-6 rounded-xl border border-gray-200 bg-${color}-50 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 hover:border-gray-300`}
  >
    <div className="p-5 text-center space-y-3">
      <div
        className={`w-14 h-14 bg-gradient-to-br from-${color}-600 to-${color}-700 rounded-xl flex items-center justify-center mx-auto text-white shadow-lg`}
      >
        {icon}
      </div>
      <p className="text-sm font-semibold text-gray-800">{label}</p>
    </div>
  </div>
);

// Activity Item Component
const ActivityItem = ({
  bg,
  icon,
  title,
  subtitle,
  amount,
  status,
  statusColor,
}) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
    <div className="flex items-center gap-4">
      <div
        className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center border border-${bg}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-black">{title}</p>
        <p className="text-xs text-gray-600">{subtitle}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-bold text-black">{amount}</p>
      <p className={`text-xs font-medium text-${statusColor}`}>{status}</p>
    </div>
  </div>
);

export default Mobile;
