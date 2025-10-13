import { TrendingUp, History } from "lucide-react";
import WalletRechargeHook from "../../../hooks/walletRechargeHook";
import { ruppeeWithComma } from "../../../helper";
import { useState } from "react";

const RechargeHistory = () => {
  const { walletDatas } = WalletRechargeHook();
  const [isHovered, setIsHovered] = useState(false);
  const recentRecharges = walletDatas?.recentRecharges;
  const isNotRecharged = !recentRecharges || recentRecharges?.length === 0;

  return (
    <div className="p-6 rounded-xl card-hover-effect-no-pointer">
      <h1 className="card-title flex items-center gap-2 mb-5">
        <History size="18" />
        Recent Recharge History
      </h1>
      {isNotRecharged && (
        <h1 className="text-center text-red-500 text-sm">No Data Available</h1>
      )}
      <div className="max-h-[500px] overflow-y-auto scrollbar-hide">
        {recentRecharges &&
          recentRecharges?.map((ele, idx) => (
            <div
              style={{
                background: "#fad48905",
                borderColor: isHovered && "none",
                transform: isHovered && "none",
                boxShadow: isHovered && "none",
                cursor: "default",
              }}
              key={idx}
              className="card-hover-effect p-4 mb-4 shadow-lg flex justify-between items-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex items-center gap-4">
                <div className="bg-[var(--bg-primary\/20)] p-2 rounded-lg">
                  <TrendingUp
                    size="14"
                    className="text-[var(--primary-color)] font-bold"
                  />
                </div>
                <div>
                  <p className="text-[var(--subheading-color)] text-xs">
                    {ele.recharge_ref}
                  </p>
                  <p className="text-sm text-[var(--primary-font-color)]">
                    {ele.recharge_date}
                  </p>
                  <p className="text-[var(--subheading-color)] text-xs">
                    {ele.via_channel}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[var(--primary-color)] font-semibold">
                  ₹{ruppeeWithComma(ele.txn_amount)}
                </div>
                <div className="flex justify-end gap-2 mt-1">
                  <span
                    className={`${
                      ele.status === "SUCCESS"
                        ? "text-green-500 border border-[text-green-500]"
                        : "text-red-500 border border-[text-red-500]"
                    } text-[10px] px-[6px] py-1 rounded-md`}
                  >
                    {ele.status}
                  </span>
                  <span
                    className={`text-[10px] px-[6px] py-1 rounded-md text-purple-500 border border-[text-purple-500]`}
                  >
                    MANUAL
                    {/* {txn.type} */}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RechargeHistory;
