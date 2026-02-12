import { useState, useMemo } from "react";
import { jobs } from "@/data/jobs";
import JobCard from "@/components/JobCard";
import Filters from "@/components/Filters";
import { Briefcase } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortAlpha, setSortAlpha] = useState(false);

  const displayedJobs = useMemo(() => {
    let filtered = jobs.filter((job) => {
      const matchesSearch = job.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesLocation =
        locationFilter === "All" || job.location === locationFilter;
      const matchesType = typeFilter === "All" || job.type === typeFilter;
      return matchesSearch && matchesLocation && matchesType;
    });

    if (sortAlpha) {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [searchTerm, locationFilter, typeFilter, sortAlpha]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground">
            <Briefcase size={18} />
          </div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            JobBoard
          </h1>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Hero */}
        <section className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 tracking-tight">
            Find your next opportunity
          </h2>
          <p className="text-muted-foreground text-lg">
            Browse {jobs.length} curated roles — internships & full-time positions.
          </p>
        </section>

        {/* Filters */}
        <section className="mb-8">
          <Filters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            locationFilter={locationFilter}
            onLocationChange={setLocationFilter}
            typeFilter={typeFilter}
            onTypeChange={setTypeFilter}
            sortAlpha={sortAlpha}
            onSortToggle={() => setSortAlpha((s) => !s)}
          />
        </section>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {displayedJobs.length} of {jobs.length} jobs
        </p>

        {/* Job grid */}
        {displayedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedJobs.map((job) => (
              <JobCard key={job.id} job={job} searchTerm={searchTerm} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-medium text-muted-foreground mb-1">
              No jobs found
            </p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
