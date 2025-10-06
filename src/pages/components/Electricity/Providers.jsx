import React, { useState } from "react";
import { Search, Building2 } from "lucide-react";

const Providers = ({ onSelect }) => {
  const [search, setSearch] = useState("");

  // Providers data
  const providers = [
    {
      id: 1,
      name: "Tamil Nadu Electricity Board (TNEB)",
      description: "Official electricity board of Tamil Nadu",
      code: "TNEB",
      state: "Tamil Nadu",
    },
    {
      id: 2,
      name: "Kerala State Electricity Board (KSEB)",
      description: "Kerala state power distribution",
      code: "KSEB",
      state: "Kerala",
    },
    {
      id: 3,
      name: "Maharashtra State Electricity Distribution Co. Ltd.",
      description: "Maharashtra electricity distribution",
      code: "MSEDCL",
      state: "Maharashtra",
    },
    {
      id: 4,
      name: "Bangalore Electricity Supply Company",
      description: "Bangalore city electricity supply",
      code: "BESCOM",
      state: "Karnataka",
    },
    {
      id: 5,
      name: "Andhra Pradesh Central Power Distribution Company",
      description: "Central AP power distribution",
      code: "APCPDCL",
      state: "Andhra Pradesh",
    },
    {
      id: 6,
      name: "Telangana State Southern Power Distribution",
      description: "South Telangana power distribution",
      code: "TSSPDCL",
      state: "Telangana",
    },
    {
      id: 7,
      name: "West Bengal State Electricity Distribution",
      description: "West Bengal electricity board",
      code: "WBSEDCL",
      state: "West Bengal",
    },
    {
      id: 8,
      name: "Bihar State Power Holding Company Ltd.",
      description: "Bihar state electricity board",
      code: "BSPHCL",
      state: "Bihar",
    },
    {
      id: 9,
      name: "Uttar Pradesh Power Corporation Ltd.",
      description: "UP state electricity corporation",
      code: "UPCL",
      state: "Uttar Pradesh",
    },
    {
      id: 10,
      name: "Rajasthan Rajya Vidyut Prasaran Nigam",
      description: "Rajasthan power transmission",
      code: "RRVPNL",
      state: "Rajasthan",
    },
  ];

  // Filtered providers based on search
  const filteredProviders = providers.filter(
    (provider) =>
      provider.name.toLowerCase().includes(search.toLowerCase()) ||
      provider.state.toLowerCase().includes(search.toLowerCase()) ||
      provider.code.toLowerCase().includes(search.toLowerCase())
  );

  // Separate card component inside same file
  const ProviderCard = ({ provider, onSelect }) => (
    <div
      className="bg-white p-4 rounded-xl border cursor-pointer flex flex-col gap-3 shadow-sm bigcards card-hover-effect"
      onClick={() => onSelect(provider)}
    >
      <div className="flex items-start gap-3 ">
        <div className="p-2 bg-primary/10 rounded-lg icon">
          <Building2 size={20} className="" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-foreground mb-1">{provider.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            {provider.description}
          </p>
          <div className="flex gap-2 flex-wrap ">
            <span className="px-2 py-0.5 text-xs font-medium rounded-md border span-hover-effect ">
              {provider.code}
            </span>
            <span className="px-2 py-0.5 text-xs font-medium rounded-md border span-hover-effect">
              {provider.state}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative w-full">
        {/* Search Icon */}
        {/* <Search
          size={16}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
        /> */}

        {/* Input Field */}
        <input
          type="text"
          placeholder="Search by provider name, state, or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-3 py-2 bg-transparent border-0 focus:ring-0 focus:outline-none text-sm text-foreground placeholder:text-muted-foreground profilecard-input"
        />
      </div>

      {/* Provider Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {filteredProviders.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            onSelect={onSelect}
          />
        ))}
        {filteredProviders.length === 0 && (
          <p className="text-muted-foreground col-span-2 text-center">
            No providers found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Providers;
