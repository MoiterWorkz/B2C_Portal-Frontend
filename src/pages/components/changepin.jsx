import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useLocation } from "react-router-dom";
import { setAccountPin } from "../../services/service";
const ChangePin = () => {
 
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const location = useLocation();

  const decodedPin = atob(location?.state?.userstorage?.encoded || "");
  const decodedLoginPin = atob (location?.state?.userstorage?.encodedPin)
  const parsedData = JSON.parse(decodedPin);
  const mobileNumber = parsedData.mobileNumber;
  const customerId = parsedData.ID;

  // ✅ Function to allow only digits and max 4 chars
  const handlePinChange = (setter) => (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) setter(value); // only digits up to 4
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ Check if old PIN matches decoded PIN
  if (oldPin !== decodedLoginPin) {
    alert("Old PIN is incorrect");
    return;
  }

  // Check if new PIN matches confirm PIN
  if (newPin !== confirmPin) {
    alert("New PIN and Confirm PIN must match");
    return;
  }

  // Check if new PIN is exactly 4 digits
  if (!/^\d{4}$/.test(newPin)) {
    alert("PIN must be exactly 4 digits");
    return;
  }

  try {
    const encodedPin = btoa(newPin); // encode new PIN
    const customerIdValue = parseInt(customerId); // ensure it's a number
    await setAccountPin(customerIdValue, mobileNumber, encodedPin);

    // console.log("CustomerID:", customerIdValue, "Mobile:", mobileNumber, "PIN:", encodedPin);
    alert("PIN successfully changed!");
  } catch (err) {
    console.error("Error setting PIN:", err);
  }
};



  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 lg:py-8">
      <div className="space-y-6 Changepin">
        <div>
          <h1 className="text-3xl font-semibold">Change PIN</h1>
          <p className="text-muted-foreground subheading2">
            Update your account PIN for better security
          </p>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm max-w-md card-hover-effect">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2 card-title">
              <Lock className="h-5 w-5 card-icon" />
              Update PIN
            </h3>
            <p className="text-sm text-muted-foreground">
              Enter your current PIN and choose a new 4-digit PIN
            </p>
          </div>

          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Old PIN */}
              <div className="space-y-2">
                <label htmlFor="oldPin" className="text-sm font-medium">
                  Old PIN
                </label>
                <div className="relative">
                  <input
                    id="oldPin"
                    type={showOld ? "text" : "password"}
                    value={oldPin}
                    onChange={handlePinChange(setOldPin)}
                    placeholder="Enter old PIN"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={4}
                    className="flex h-9 w-full rounded-md border border-input px-3 py-1 pr-10 profilecard-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOld(!showOld)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* New PIN */}
              <div className="space-y-2">
                <label htmlFor="newPin" className="text-sm font-medium">
                  New PIN
                </label>
                <div className="relative">
                  <input
                    id="newPin"
                    type={showNew ? "text" : "password"}
                    value={newPin}
                    onChange={handlePinChange(setNewPin)}
                    placeholder="Enter new PIN"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={4}
                    className="flex h-9 w-full rounded-md border border-input px-3 py-1 pr-10 profilecard-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm PIN */}
              <div className="space-y-2">
                <label htmlFor="confirmPin" className="text-sm font-medium">
                  Confirm New PIN
                </label>
                <div className="relative">
                  <input
                    id="confirmPin"
                    type={showConfirm ? "text" : "password"}
                    value={confirmPin}
                    onChange={handlePinChange(setConfirmPin)}
                    placeholder="Confirm new PIN"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={4}
                    className="flex h-9 w-full rounded-md border border-input px-3 py-1 pr-10 profilecard-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="text-sm text-muted-foreground space-y-1">
                <p>PIN requirements:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Must be exactly 4 digits</li>
                  <li>Only numbers (0-9) are allowed</li>
                  <li>
                    Choose a PIN that's easy to remember but hard to guess
                  </li>
                  <li>Avoid using birth dates or sequential numbers</li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-9 rounded-md text-sm font-medium change-button"
              >
                Change PIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePin;
