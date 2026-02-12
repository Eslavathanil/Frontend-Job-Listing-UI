import { Search } from "lucide-react";

interface FiltersProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  locationFilter: string;
  onLocationChange: (val: string) => void;
  typeFilter: string;
  onTypeChange: (val: string) => void;
  sortAlpha: boolean;
  onSortToggle: () => void;
}

const FilterButton = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 ${
      active
        ? "bg-primary text-primary-foreground shadow-sm"
        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
    }`}
  >
    {label}
  </button>
);

const Filters = ({
  searchTerm,
  onSearchChange,
  locationFilter,
  onLocationChange,
  typeFilter,
  onTypeChange,
  sortAlpha,
  onSortToggle,
}: FiltersProps) => {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Search job titles..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-input bg-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
        />
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mr-1">
          Location
        </span>
        {["All", "Remote", "On-site"].map((loc) => (
          <FilterButton
            key={loc}
            label={loc}
            active={locationFilter === loc}
            onClick={() => onLocationChange(loc)}
          />
        ))}

        <span className="mx-2 h-5 w-px bg-border hidden sm:block" />

        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mr-1">
          Type
        </span>
        {["All", "Internship", "Full-time"].map((t) => (
          <FilterButton
            key={t}
            label={t}
            active={typeFilter === t}
            onClick={() => onTypeChange(t)}
          />
        ))}

        <span className="mx-2 h-5 w-px bg-border hidden sm:block" />

        <FilterButton
          label={sortAlpha ? "A → Z ✓" : "A → Z"}
          active={sortAlpha}
          onClick={onSortToggle}
        />
      </div>
    </div>
  );
};

export default Filters;
